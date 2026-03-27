import { Bot, Code2, Download, GitFork, Star } from 'lucide-react'
import React from 'react'
import { RepoData } from '@/types';
import { Button } from '@/components/ui/button';

function RepoHeader({data, onAnalyzeClick, loadingAI}: {data: RepoData, onAnalyzeClick: () => void, loadingAI: boolean}) {
    return (
    <div className="mb-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
            <div className="flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/5">
            <Code2 className="h-3.5 w-3.5" />
            </div>
            <span className="font-mono uppercase tracking-widest">
            RepoLens / Analyzer
            </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
            <h1 className="text-4xl font-black tracking-tight text-white">
                {data.repoName}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatBadge 
                    icon={<Star className="h-3.5 w-3.5 text-yellow-400" />}
                    value={data.stars.toString()} 
                />
                {data.language && (
                    <StatBadge
                        icon={<span className="h-2 w-2 rounded-full bg-blue-400" />}
                        value={data.language}
                    />
                )}
                <StatBadge
                    icon={<GitFork className="h-3.5 w-3.5 text-slate-400" />}
                    value={data.forks.toString()} 
                />
            </div>
            </div>

            <div className="flex shrink-0 gap-2">
            <Button
                variant="outline"
                size="sm"
                className="gap-2 border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
            >
                <Download className="h-4 w-4" />
                Export Report
            </Button>
            <Button 
                size="sm"
                className="gap-2 bg-indigo-600 text-white hover:bg-indigo-500"
                onClick={onAnalyzeClick}
                disabled={loadingAI}
            >
                <Bot className="h-4 w-4" />
                {loadingAI ? "Analyzing..." : "Analyze with Ai"}
            </Button>
            </div>
        </div>
    </div>
    )
}

export default RepoHeader

function StatBadge({icon,value}: {icon: React.ReactNode;value: string}) {
    return (
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
            {icon}
            {value}
        </div>
    );
}