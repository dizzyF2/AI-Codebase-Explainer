'use client'

import { RepoData, TabKey } from "@/types";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface GProps {
    data: RepoData,
    TABS: { key: TabKey; label: string; icon: React.ElementType}[],
    activeTab: TabKey,
    setActiveTab: (key: TabKey) => void
}

function SidebarWrapper({data, TABS, activeTab, setActiveTab}: GProps) {
    const router = useRouter()


    return (
        <aside className="fixed left-0 top-14 flex h-[calc(100vh-3.5rem)] w-56 flex-col border-r border-white/5 bg-[#0a0f1e] px-3 py-5">
            {/* Project info */}
            <div className="mb-6 px-2">
            <p className="font-semibold text-white">{data.repoName.split("/")[0] === "facebook" ? "Project Alpha" : data.repoName}</p>
            <p className="mt-0.5 text-xs text-slate-500">{data.branch}</p>
            </div>

            {/* Nav */}
            <nav className="space-y-1">
                {TABS.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                            activeTab === key
                            ? "bg-indigo-600/20 text-white"
                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                        )}
                    >
                        <Icon className="h-4 w-4 shrink-0" />
                        {label}
                    </button>
                ))}
            </nav>

            {/* New Scan button at bottom */}
            <div className="mt-auto">
                <Button
                    onClick={() => router.push("/")}
                    className="w-full rounded-xl bg-slate-700 py-2.5 text-sm font-medium text-white hover:bg-slate-600"
                >
                    New Scan
                </Button>
            </div>
        </aside>
    )
}

export default SidebarWrapper