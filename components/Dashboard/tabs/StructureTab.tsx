import type { RepoData } from "@/types";
import FileTree from "../FileTree";



export default function StructureTab({ data }:{data: RepoData}) {
    return (
        <div className="rounded-xl border border-white/8 bg-[#111827] p-5">
            <h3 className="mb-4 text-sm font-semibold text-slate-300">
                Project Structure
            </h3>
            <FileTree nodes={data.structure} />
        </div>
    );
}
