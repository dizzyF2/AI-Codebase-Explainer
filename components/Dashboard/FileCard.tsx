"use client";

import { Settings, BookOpen, Rocket, Code2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ImportantFile } from "@/types";

const ICONS = {
    gear: Settings,
    book: BookOpen,
    rocket: Rocket,
    code: Code2,
};

const ICON_COLORS: Record<string, string> = {
    gear: "text-orange-400",
    book: "text-blue-400",
    rocket: "text-emerald-400",
    code: "text-purple-400",
};

interface FileCardProps {
    file: ImportantFile;
}

export default function FileCard({ file }: FileCardProps) {
    const IconComp = ICONS[file.icon ?? "code"] ?? Code2;
    const iconColor = ICON_COLORS[file.icon ?? "code"];

    return (
        <div className="flex flex-col rounded-xl border border-white/8 bg-[#111827] p-5 hover:border-white/15 transition-colors">
            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
                <IconComp className={`h-6 w-6 ${iconColor}`} />
                <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-slate-400">
                    {file.ext}
                </span>
            </div>

            {/* Content */}
            <h3 className="mb-1.5 font-semibold text-white">{file.name}</h3>
            <p className="flex-1 text-sm leading-relaxed text-slate-400">
                {file.description}
            </p>

            {/* Footer */}
            <div className="mt-4 border-t border-white/5 pt-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center gap-2 text-xs text-slate-400 hover:text-white hover:bg-white/5"
                >
                    View Details
                    <Eye className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
}
