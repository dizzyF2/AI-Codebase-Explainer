import { RepoData, TabKey } from "@/types";
import { motion } from "motion/react"
import TechMiniCard from "./TechMiniCard";
import FileCard from "../FileCard";


function OverviewExtras({ data, onViewAllFiles }:{data: RepoData, onViewAllFiles: (key: TabKey) => void}) {
    return (
        <>
            {/* Tech stack quick cards */}
            <motion.div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {data.techStack.slice(0, 4).map((tech) => (
                    <TechMiniCard
                        key={tech.name}
                        tech={tech}
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
                    {data.importantFiles.map((file) => (
                        <FileCard key={file.name} file={file} />
                    ))}
                </div>
            </motion.div>
        </>
    );
}

export default OverviewExtras