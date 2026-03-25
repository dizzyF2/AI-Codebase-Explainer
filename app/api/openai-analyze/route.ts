import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// delay helper
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
    const {
        owner,
        repo,
        readmeContent,
        packageJsonContent,
        forceRefresh,
    } = await req.json();

    const fullName = `${owner}/${repo}`;

    try {
        // Check cache
        const { data: cached } = await supabase
        .from("ai_cache")
        .select("*")
        .eq("repo_full_name", fullName)
        .single();

        const isCachedFailure =
        cached?.summary?.includes("unavailable") ||
        cached?.summary?.includes("Could not");

        // Only return cache if it's NOT a failure
        if (cached && !forceRefresh && !isCachedFailure) {
        return NextResponse.json({ data: cached });
        }

        // Weak repo detection
        const isWeakRepo =
        !readmeContent ||
        readmeContent.length < 200 ||
        readmeContent.toLowerCase().includes("coming soon") ||
        readmeContent.toLowerCase().includes("todo") ||
        (readmeContent.toLowerCase().includes("odoo") &&
            !packageJsonContent);

        if (isWeakRepo) {
        const fallbackData = {
            summary: "Not enough information to analyze this repository.",
            summaryDetail:
            "This repository does not contain sufficient documentation or configuration files for meaningful analysis.",
            techStack: [],
            importantFiles: [],
        };

        // cache (this is safe fallback, not AI failure)
        await supabase.from("ai_cache").upsert({
            repo_full_name: fullName,
            summary: fallbackData.summary,
            summary_detail: fallbackData.summaryDetail,
            tech_stack: [],
            important_files: [],
        });

        return NextResponse.json({ data: fallbackData });
        }

        // Trim inputs
        const trimmedReadme = readmeContent?.slice(0, 4000) || "N/A";
        const trimmedPackage = packageJsonContent?.slice(0, 2000) || "N/A";

        // Prompt
        const prompt = `
    You are an expert software engineer.

    Analyze this GitHub repository and return ONLY valid JSON.

    Required JSON format:
    {
    "summary": "short 1-2 sentence summary",
    "summaryDetail": "clear explanation of what the project does and how it works",
    "techStack": [{ "name": "string", "category": "frontend | backend | database | tooling" }],
    "importantFiles": [{ "name": "string", "description": "short explanation", "ext": "string", "icon": "string" }]
    }

    Rules:
    - Be concise and clear
    - Do NOT include any text outside JSON
    - Do NOT hallucinate if info is missing

    README:
    ${trimmedReadme}

    package.json:
    ${trimmedPackage}
    `;

        // Model fallback system
        const models = [
        "openrouter/free",
        "meta-llama/llama-3.1-8b-instruct:free",
        "mistralai/mistral-7b-instruct:free",
        ];

        type ChatCompletion = {
        choices: {
            message: { content: string | null };
        }[];
        };

        let completion: ChatCompletion | null = null;

        for (const model of models) {
        try {
            await sleep(1000);

            const res = await openai.chat.completions.create({
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
            max_tokens: 700,
            });

            const content = res?.choices?.[0]?.message?.content;

            if (content && content.length > 20) {
            completion = res;
            break;
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            console.warn(`Model failed: ${model}`);
        }
        }

        // All models failed
        if (!completion) {
        return NextResponse.json({
            data: {
            summary: "AI analysis temporarily unavailable.",
            summaryDetail:
                "All AI providers are currently rate-limited. Try again shortly.",
            techStack: [],
            importantFiles: [],
            },
        });
        }

        const text = completion.choices?.[0]?.message?.content || "{}";

        let aiData;

        // Safe parsing
        try {
        aiData = JSON.parse(text);
        } catch {
        aiData = {
            summary: "",
            summaryDetail: text,
            techStack: [],
            importantFiles: [],
        };
        }

        //Detect bad AI output
        const isBadResponse =
        !aiData.summary || aiData.summary.trim().length < 5;

        if (isBadResponse) {
        aiData = {
            summary: "Could not generate a reliable summary.",
            summaryDetail:
            "The AI response was incomplete or unclear. Try another repository.",
            techStack: [],
            importantFiles: [],
        };
        }

        //Cache ONLY valid results
        const isFailure =
        aiData.summary?.includes("unavailable") ||
        aiData.summary?.includes("Could not") ||
        aiData.summary?.length < 10;
        
        if (!isFailure) {
        await supabase.from("ai_cache").upsert({
            repo_full_name: fullName,
            summary: aiData.summary,
            summary_detail: aiData.summaryDetail,
            tech_stack: aiData.techStack || [],
            important_files: aiData.importantFiles || [],
        });
        }

        return NextResponse.json({ data: aiData });

    } catch (err: unknown) {
        const message =
        err instanceof Error ? err.message : "Something went wrong";

        return NextResponse.json({ error: message }, { status: 500 });
    }
}