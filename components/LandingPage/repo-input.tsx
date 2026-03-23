"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidGithubUrl } from "@/lib/data";
import { extractRepoInfo } from "@/lib/utils";


interface RepoInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RepoInput({value, onChange}:RepoInputProps) {
    const router = useRouter();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);



    const handleSubmit = async () => {
        const val = value.trim();

        if (!val) {
        setError("Please enter a GitHub repository URL.");
        return;
        }

        if (!isValidGithubUrl(val)) {
        setError("Please enter a valid GitHub repository URL.");
        return;
        }

        setError("");

        const repoInfo = extractRepoInfo(val);

        if (!repoInfo || !repoInfo.owner || !repoInfo.repo) {
        setError("Invalid GitHub repository format.");
        return;
        }

        try {
        setLoading(true);

        const res = await fetch("/api/github", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(repoInfo),
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.error || "Failed to fetch repository");
        }

        router.push(`/dashboard?repo=${repoInfo.owner}/${repoInfo.repo}`);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong"
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <div className="w-full max-w-2xl">
        <div className="flex items-center gap-0 rounded-xl border border-white/10 bg-[#111827] p-1.5 shadow-xl">
            <div className="flex flex-1 items-center gap-3 px-3">
            <Link2 className="h-4 w-4 shrink-0 text-slate-500" />

            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="https://github.com/owner/repo"
                disabled={loading}
                className="h-10 border-0 bg-transparent p-0 text-sm text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            </div>

            <Button
            onClick={handleSubmit}
            disabled={loading}
            className="h-10 shrink-0 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors disabled:opacity-50"
            >
            {loading ? "Analyzing..." : "Analyze Repository"}
            </Button>
        </div>

        {error && (
            <p className="mt-2 text-center text-xs text-red-400">{error}</p>
        )}
        </div>
    );
}