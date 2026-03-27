'use client'

import MainContent from '@/components/Dashboard/layout/MainContent'
import SidebarWrapper from '@/components/Dashboard/layout/SidebarWrapper'
import Navbar from '@/components/navbar'
import { GitHubContent, ImportantFile, RepoData, TabKey } from '@/types';
import { FileSearch, FolderTree, Layers, LayoutDashboard } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function DashboardPage() {
    
    const searchParams = useSearchParams();
    const repo = searchParams.get("repo") ?? "facebook/react";
    
    const [activeTab, setActiveTab] = useState<TabKey>("overview");
    const [data, setData] = useState<RepoData | null>(null);

    const [aiData, setAiData] = useState<RepoData | null>(null);
    const [loadingAI, setLoadingAI] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [owner, name] = repo.split("/");

    const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
        { key: "overview", label: "Overview", icon: LayoutDashboard },
        { key: "structure", label: "Structure", icon: FolderTree },
        { key: "techstack", label: "Tech Stack", icon: Layers },
        { key: "files", label: "Important Files", icon: FileSearch },
    ];

    useEffect(() => {
        const fetchRepo = async () => {
            if (!owner || !name) return;

            try {
                setLoading(true);

                const res = await fetch("/api/github", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ owner, repo: name }),
                });

                const result = await res.json();
                console.log("GitHub DATA:", result);

                if (!res.ok) {
                throw new Error(result.error || "Failed to fetch repo");
                }

                const importantFiles: ImportantFile[] = [];

                if (result.readmeContent) {
                importantFiles.push({
                    name: "README.md",
                    description: "Project documentation and overview",
                    ext: "MD",
                    icon: "book",
                });
                }

                if (result.packageJsonContent) {
                importantFiles.push({
                    name: "package.json",
                    description: "Project dependencies and scripts",
                    ext: "JSON",
                    icon: "gear",
                });
                }

                const repoData: RepoData = {
                repoName: `${owner}/${name}`,
                branch: result.data.branch || "main",
                stars: result.data.stars || 0,
                forks: result.data.forks || 0,
                language: result.data.language || "Unknown",

                summary: "",
                summaryDetail: "",

                structure: result.data.structure.map((file: GitHubContent) => ({
                    name: file.name,
                    type: file.type === "dir" ? "folder" : "file",
                    children: file.type === "dir" ? [] : undefined,
                })),

                techStack: [],
                importantFiles,

                readmeContent: result.readmeContent,
                packageJsonContent: result.packageJsonContent,
                };

                setData(repoData);
            } catch (err: unknown) {
                const message =
                err instanceof Error ? err.message : "Something went wrong";
                setError(message);
            } finally {
                setLoading(false);
            }

        };
        fetchRepo();
    }, [owner, name]);

    const handleAnalyzeClick = async () => {
        if (!data) return;

        setLoadingAI(true);
        const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                readmeContent: data.readmeContent,
                packageJsonContent: data.packageJsonContent,
            }),
        });

        const json = await res.json();
        setAiData(json.data);
        setLoadingAI(false);
    };


    if (loading) {
        return (
        <div className="min-h-screen bg-[#0a0f1e] text-white flex items-center justify-center">
            Loading...
        </div>
        );
    }

    if (error) {
        return (
        <div className="min-h-screen bg-[#0a0f1e] text-white flex items-center justify-center">
            {error}
        </div>
        );
    }

    if (!data) return null;
    return (
        <div className="min-h-screen bg-[#0a0f1e] text-white">
            <Navbar />
            <div className="flex pt-14">
                <SidebarWrapper data={data} TABS={TABS} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <MainContent 
                    data={data} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab}
                    onAnalyzeClick={handleAnalyzeClick}
                    aiData={aiData}
                    loadingAI={loadingAI}
                />
            </div>
        </div>
    )
}

export default DashboardPage