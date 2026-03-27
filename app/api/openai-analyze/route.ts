import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { readmeContent, packageJsonContent } =
        await req.json();

    try {
        const hasReadme =
        readmeContent && readmeContent.length > 200;
        const hasPackageJson =
        packageJsonContent && packageJsonContent.includes("{");

        if (!hasReadme && !hasPackageJson) {
        return NextResponse.json({
            data: {
            summary: "Not enough data to analyze this repository.",
            summaryDetail:
                "This repository does not contain a meaningful README or package.json file.",
            techStack: [],
            importantFiles: [],
            },
        });
        }

        const trimmedReadme = hasReadme
        ? readmeContent.slice(0, 3000)
        : "No README provided";

        const trimmedPackage = hasPackageJson
        ? packageJsonContent.slice(0, 1500)
        : "No package.json provided";

        const prompt = `
    You are an expert software engineer analyzing a GitHub repository.

    Your job:
    1. Generate a short summary (1-2 sentences) USING README only
    2. Generate a detailed explanation of the project (summaryDetail)
    3. Extract tech stack STRICTLY from package.json dependencies
    4. Identify important files ONLY if clearly relevant

    Return ONLY valid JSON:

    {
    "summary": "string",
    "summaryDetail": "string",
    "techStack": [{ "name": "string", "category": "frontend | backend | database | tooling" }],
    "importantFiles": [{ "name": "string", "description": "string", "ext": "string", "icon": "string" }]
    }

    Rules:
    - If README is weak → keep summary short and generic
    - If package.json is missing → techStack = []
    - DO NOT guess technologies not in package.json
    - DO NOT hallucinate
    - Be concise

    README:
    ${trimmedReadme}

    package.json:
    ${trimmedPackage}
    `;

        const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 600,
        });

        const text = completion.choices?.[0]?.message?.content || "{}";

        let aiData;

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

        if (!aiData.summary || aiData.summary.length < 5) {
        aiData.summary = "Could not generate a reliable summary.";
        }

        if (!Array.isArray(aiData.techStack)) {
        aiData.techStack = [];
        }

        if (!Array.isArray(aiData.importantFiles)) {
        aiData.importantFiles = [];
        }

        return NextResponse.json({ data: aiData });

    } catch (err: unknown) {
        const message =
        err instanceof Error ? err.message : "Something went wrong";

        return NextResponse.json({ error: message }, { status: 500 });
    }
}