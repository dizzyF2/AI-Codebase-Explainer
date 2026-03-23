import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { owner, repo } = await req.json();

    try {
        const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents`
        );

        if (!res.ok) {
        return NextResponse.json({ error: "Repo not found" }, { status: 404 });
        }

        const data = await res.json();

        return NextResponse.json({ data });
    } catch (err) {
        return NextResponse.json(
        { error: "Something went wrong: ", err},
        { status: 500 }
        );
    }
}