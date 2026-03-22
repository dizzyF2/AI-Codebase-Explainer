import { RepoData, TabKey } from "@/types";
import { motion } from "framer-motion"
import TechMiniCard from "./TechMiniCard";


function OverviewExtras({ data, onViewAllFiles }:{data: RepoData, onViewAllFiles: (key: TabKey) => void}) {
    return (
        <>
            {/* Tech stack quick cards */}
            <motion.div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {data.techStack.slice(0, 4).map((tech) => (
                    <TechMiniCard
                        key={tech.name}
                        name={tech.name}
                        category={tech.category}
                    />
                ))}
            </motion.div>

            <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Important Files</h2>
                    <button
                        onClick={() => onViewAllFiles("files")}
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        View all files <span>›</span>
                    </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                    {data.importantFiles.map((file) => {
                        const ICON_MAP: Record<string, string> = { gear: "⚙", book: "📖", rocket: "🚀" };
                        return (
                        <div
                            key={file.name}
                            className="rounded-xl border border-white/8 bg-[#111827] p-5 hover:border-white/15 transition-colors"
                        >
                            <div className="mb-3 flex items-start justify-between">
                                <span className="text-xl">{ICON_MAP[file.icon ?? ""] ?? "📄"}</span>
                                <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-slate-400">
                                    {file.ext}
                                </span>
                            </div>
                            <p className="mb-1 font-semibold text-white">{file.name}</p>
                            <p className="text-xs leading-relaxed text-slate-400">{file.description}</p>
                            <button className="mt-4 flex w-full items-center justify-center gap-1.5 border-t border-white/5 pt-4 text-xs text-slate-400 hover:text-white transition-colors">
                                View Details <span className="text-slate-600">👁</span>
                            </button>
                        </div>
                        );
                    })}
                </div>
            </motion.div>
        </>
    );
}

export default OverviewExtras