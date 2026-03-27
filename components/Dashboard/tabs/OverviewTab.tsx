import { Sparkles } from "lucide-react";
import type { RepoData } from "@/types";

export default function OverviewTab({data,aiData,}:{data: RepoData;aiData: RepoData | null;}) {
    const safeSummary =
        aiData?.summary && aiData.summary.length > 10
            ? aiData.summary
            : data.summary && data.summary.length > 10
            ? data.summary
            : "This repository could not be analyzed due to limited information.";

    const safeDetail =
        aiData?.summaryDetail && aiData.summaryDetail.length > 20
            ? aiData.summaryDetail
            : data.summaryDetail && data.summaryDetail.length > 20
            ? data.summaryDetail
            : "Try analyzing a repository with a detailed README or configuration files.";

    return (
        <div className="rounded-xl border border-white/8 bg-[#111827] p-6">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                        AI Insights Summary
                    </span>
                </div>
                <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>

            <h3 className="mb-4 text-xl font-bold leading-snug text-white">
                {safeSummary}
            </h3>

            {safeDetail
                .split("\n\n")
                .map((para, i) => (
                    <p key={i} className="mb-3 text-sm leading-relaxed text-slate-400">
                        {para}
                    </p>
                ))}
        </div>
    );
}