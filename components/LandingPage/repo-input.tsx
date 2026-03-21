"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidGithubUrl } from "@/lib/data";


interface RepoInputProps {
    value?: string;
    onChange?: (val: string) => void;
}

export default function RepoInput({ value, onChange }: RepoInputProps) {
    const router = useRouter();
    const [internalValue, setInternalValue] = useState("");
    const [error, setError] = useState("");

    const inputValue = value !== undefined ? value : internalValue;
    const handleChange = (val: string) => {
        setError("");
        if (onChange) onChange(val);
        else setInternalValue(val);
    };

    const handleSubmit = () => {
        if (!inputValue.trim()) {
        setError("Please enter a GitHub repository URL.");
        return;
        }
        if (!isValidGithubUrl(inputValue)) {
        setError("Please enter a valid GitHub repository URL.");
        return;
        }
        router.push(`/dashboard?repo=${encodeURIComponent(inputValue)}`);
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
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="https://github.com/owner/repo"
                className="h-10 border-0 bg-transparent p-0 text-sm text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            </div>
            <Button
            onClick={handleSubmit}
            className="h-10 shrink-0 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
            Analyze Repository
            </Button>
        </div>
        {error && (
            <p className="mt-2 text-center text-xs text-red-400">{error}</p>
        )}
        </div>
    );
}
