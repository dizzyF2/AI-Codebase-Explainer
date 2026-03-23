'use client'

import MainContent from '@/components/Dashboard/layout/MainContent'
import SidebarWrapper from '@/components/Dashboard/layout/SidebarWrapper'
import Navbar from '@/components/navbar'
import { RepoData, TabKey } from '@/types';
import { FileSearch, FolderTree, Layers, LayoutDashboard } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function DashboardPage() {
    
    const searchParams = useSearchParams();
    const repo = searchParams.get("repo") ?? "facebook/react";
    const repoName = repo.replace("https://github.com/", "");
    
    const [activeTab, setActiveTab] = useState<TabKey>("overview");
    const [data, setData] = useState<RepoData | null>(null);
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

            if (!res.ok) {
            throw new Error(result.error || "Failed to fetch repo");
            }

            // TEMP mapping
            const repoData: RepoData = {
            repoName: `${owner}/${name}`,
            branch: "main",
            stars: 0,
            forks: 0,
            language: "Unknown",
            summary: "",
            summaryDetail: "",
            structure: result.data.map((file: any) => ({
                name: file.name,
                type: file.type === "dir" ? "folder" : "file",
            })),
            techStack: [],
            importantFiles: [],
            };

            setData(repoData);

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong"
            setError(message);
        } finally {
            setLoading(false);
        }
        };

        fetchRepo();
    }, [owner, name]);


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

    // Safety check
    if (!data) return null;
    return (
        <div className="min-h-screen bg-[#0a0f1e] text-white">
            <Navbar />
            <div className="flex pt-14">
                <SidebarWrapper data={data} TABS={TABS} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <MainContent data={data} repoName={repoName} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
        </div>
    )
}

export default DashboardPage