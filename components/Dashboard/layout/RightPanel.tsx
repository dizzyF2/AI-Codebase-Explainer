import { ChevronDown } from 'lucide-react'
import FileTree from '../FileTree'
import { RepoData } from '@/types';



function RightPanel({data}: {data:RepoData}) {
    return (
        <div className="space-y-4">
            {/* Project Structure mini */}
            <div className="rounded-xl border border-white/8 bg-[#111827] p-4">
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-200">
                    Project Structure
                    </h3>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                </div>
                <FileTree nodes={data.structure} />
            </div>

            {/* Logic Breadcrumb */}
            <div className="rounded-xl border border-white/8 bg-[#111827] p-4">
                <h3 className="mb-2 text-sm font-semibold text-slate-200">
                    Logic Breadcrumb
                </h3>
                <div className="mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs text-emerald-400">AI Analysis Active</span>
                </div>
                <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs text-slate-500">Tracing:</span>
                    <span className="rounded bg-slate-700/60 px-2 py-0.5 font-mono text-[11px] text-slate-300">
                    src/hooks/useData.ts
                    </span>
                </div>
                {/* Mini graph */}
                <div className="h-24 overflow-hidden rounded-lg bg-[#0a1020] p-2">
                    <div className="flex h-full items-end justify-around opacity-60">
                        {[3, 5, 4, 7, 6, 8, 5, 4, 6, 7].map((h, i) => (
                            <div
                            key={i}
                            className="w-1.5 rounded-sm bg-emerald-500/60"
                            style={{ height: `${h * 10}%` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightPanel