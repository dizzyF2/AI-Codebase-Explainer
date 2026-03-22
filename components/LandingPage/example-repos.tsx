"use client";

import { EXAMPLE_REPOS } from "@/lib/data";
import { Button } from "../ui/button";

interface ExampleReposProps {
    onSelect: (repo: string) => void;
}

export default function ExampleRepos({ onSelect }: ExampleReposProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-500">Try these:</span>
            {EXAMPLE_REPOS.map((repo) => (
                <Button
                    key={repo}
                    onClick={() => onSelect(`https://github.com/${repo}`)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                    {repo}
                </Button>
            ))}
        </div>
    );
}
