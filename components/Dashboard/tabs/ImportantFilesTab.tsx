import type { RepoData } from "@/types";
import FileCard from "../FileCard";


export default function ImportantFilesTab({ data }: {data: RepoData}) {
    return (
        <div>
            <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Important Files</h3>
                <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
                    View all files
                    <span className="ml-0.5">›</span>
                </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.importantFiles.map((file) => (
                    <FileCard key={file.name} file={file} />
                ))}
            </div>
        </div>
    );
}
