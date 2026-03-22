import { Sparkles } from "lucide-react";
import type { RepoData } from "@/types";


export default function OverviewTab({ data }: {data: RepoData}) {
    return (
        <div className="rounded-xl border border-white/8 bg-[#111827] p-6">
            {/* AI Badge */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                        AI Insights Summary
                    </span>
                </div>
                <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>

            {/* Summary headline */}
            <h3 className="mb-4 text-xl font-bold leading-snug text-white">
                {data.summary}
            </h3>

            {/* Detail paragraphs */}
            {data.summaryDetail.split("\n\n").map((para, i) => (
                <p key={i} className="mb-3 text-sm leading-relaxed text-slate-400">
                    {para.includes("Virtual DOM") ? (
                        <>
                            Key architectural patterns observed include the{" "}
                            <em className="italic text-slate-300">Virtual DOM implementation</em>
                            {para.split("Virtual DOM implementation")[1]}
                        </>
                    ) : (
                        para
                    )}
                </p>
            ))}
        </div>
    );
}
