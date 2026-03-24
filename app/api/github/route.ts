import { GitHubContent } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { owner, repo } = await req.json();

        if (!owner || !repo) {
        return NextResponse.json(
            { error: "Missing owner or repo" },
            { status: 400 }
        );
        }

        const repoRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,{
            headers:{
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            }
        }
        );

        if (!repoRes.ok) {
            const errorData = await repoRes.json();

            return NextResponse.json(
                {
                error:
                    errorData.message || "Failed to fetch repository",
                },
                { status: repoRes.status }
            );
        }

        const repoDetails = await repoRes.json();

        const contentsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents`
        );

        const contents: GitHubContent[] = contentsRes.ok ? await contentsRes.json() : [];

        const structure = contents.map((file) => ({
        name: file.name,
        type: file.type === "dir" ? "folder" : "file",
        }));

        let readmeContent: string | null = null;

        try {
        const readmeRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/readme`
        );

        if (readmeRes.ok) {
            const readmeData = await readmeRes.json();
            readmeContent = Buffer.from(
            readmeData.content,
            "base64"
            ).toString("utf-8");
        }
        } catch {}

        let packageJsonContent: string | null = null;

        try {
        const pkgRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/package.json`
        );

        if (pkgRes.ok) {
            const pkgData = await pkgRes.json();
            packageJsonContent = Buffer.from(
            pkgData.content,
            "base64"
            ).toString("utf-8");
        }
        } catch {}

        // 🔹 Final response
        return NextResponse.json({
        data: {
            repoName: repoDetails.full_name,
            branch: repoDetails.default_branch,
            stars: repoDetails.stargazers_count,
            forks: repoDetails.forks_count,
            language: repoDetails.language,
            structure,

            // AI will fill these later
            summary: undefined,
            summaryDetail: undefined,
            techStack: [],
            importantFiles: [],
        },

        readmeContent,
        packageJsonContent,
        });

    } catch (err: unknown) {
        const message =
        err instanceof Error ? err.message : "Something went wrong";

        return NextResponse.json(
        { error: message },
        { status: 500 }
        );
    }
}