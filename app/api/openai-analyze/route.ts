import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    export async function POST(req: Request) {
    const { owner, repo, readmeContent, packageJsonContent } = await req.json();
    const fullName = `${owner}/${repo}`;

    try {
        // Check cache
        const { data: cached } = await supabase
        .from("ai_cache")
        .select("*")
        .eq("repo_full_name", fullName)
        .single();

        if (cached) {
        return NextResponse.json({ data: cached });
        }

        
        const prompt = `
    Analyze this GitHub repository and provide:
    1. Short summary (1-2 sentences)
    2. Detailed summary paragraphs
    3. Tech stack as array [{name, category}]
    4. Important files as array [{name, description, ext, icon}]

    README content:
    ${readmeContent || "N/A"}

    package.json content:
    ${packageJsonContent || "N/A"}
    Respond strictly in JSON with keys: summary, summaryDetail, techStack, importantFiles
    `;

        const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2, // lower temp to keep output predictable
        max_tokens: 800,  // limit tokens to save free quota
        });

        const text = completion.choices?.[0]?.message?.content || "{}";
        let aiData;

        try {
        aiData = JSON.parse(text);
        } catch {
        aiData = { summary: "", summaryDetail: text, techStack: [], importantFiles: [] };
        }

        // Cache in Supabase
        await supabase.from("ai_cache").insert({
        repo_full_name: fullName,
        summary: aiData.summary,
        summary_detail: aiData.summaryDetail,
        tech_stack: aiData.techStack || [],
        important_files: aiData.importantFiles || [],
        });

        return NextResponse.json({ data: aiData });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}