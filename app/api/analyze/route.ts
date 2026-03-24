import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
    });

    export async function POST(req: Request) {
    try {
        const { readme, packageJson } = await req.json();

        const prompt = `
    You are a senior software engineer.

    Analyze this repository:

    README:
    ${readme || "Not provided"}

    PACKAGE.JSON:
    ${packageJson || "Not provided"}

    Return ONLY valid JSON:

    {
    "summary": "short summary (max 2 sentences)",
    "summaryDetail": "detailed explanation",
    "techStack": [
        { "name": "Next.js", "category": "FRAMEWORK" }
    ]
    }
    `;

        const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        });

        if (!response.text) {
            throw new Error("AI returned empty response");
        }
        
        const text = response.text;

        // clean markdown
        const cleaned = text.replace(/```json|```/g, "").trim();

        const parsed = JSON.parse(cleaned);

        return NextResponse.json(parsed);

    } catch (err: unknown) {
        const message =
        err instanceof Error ? err.message : "AI failed";

        return NextResponse.json({ error: message }, { status: 500 });
    }
}