'use client'

import { cn } from "@/lib/utils";
import { FileNode } from "@/types";
import { ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";


interface FileTreeProps {
    nodes: FileNode[];
    depth?: number;
}

function FileTreeNode({ node, depth = 0 }: { node: FileNode; depth: number }) {
    const [open, setOpen] = useState(true);
    const isFolder = node.type === "folder";

    return (
        <div>
            <div
                className={cn(
                "flex items-center gap-1.5 rounded-md px-2 py-1 text-sm cursor-pointer group transition-colors",
                node.active
                    ? "bg-slate-700/60 text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
                onClick={() => isFolder && setOpen((o) => !o)}
            >
                {isFolder ? (
                <>
                    <ChevronRight
                        className={cn(
                            "h-3 w-3 shrink-0 text-slate-500 transition-transform",
                            open && "rotate-90"
                        )}
                    />
                    {open ? (
                        <FolderOpen className="h-4 w-4 shrink-0 text-amber-400" />
                        ) : (
                        <Folder className="h-4 w-4 shrink-0 text-amber-400" />
                    )}
                </>
                ) : (
                <>
                    <span className="w-3" />
                    <FileText
                        className={cn(
                            "h-4 w-4 shrink-0",
                            node.active ? "text-blue-400" : "text-slate-500"
                        )}
                    />
                </>
                )}
                <span className="truncate">{node.name}</span>
            </div>

            {isFolder && open && node.children && (
                <div>
                <FileTree nodes={node.children} depth={depth + 1} />
                </div>
            )}
        </div>
    );
}

function FileTree({ nodes, depth = 0 }: FileTreeProps) {
    return (
        <div className="space-y-0.5">
            {nodes.map((node, i) => (
                <FileTreeNode key={`${node.name}-${i}`} node={node} depth={depth} />
            ))}
        </div>
    );
}

export default FileTree