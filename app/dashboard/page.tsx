'use client'

import MainContent from '@/components/Dashboard/layout/MainContent'
import SidebarWrapper from '@/components/Dashboard/layout/SidebarWrapper'
import Navbar from '@/components/navbar'
import { MOCK_REPO_DATA } from '@/lib/data';
import { RepoData, TabKey } from '@/types';
import { FileSearch, FolderTree, Layers, LayoutDashboard } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

function DashboardPage() {
    
    const searchParams = useSearchParams();
    const repo = searchParams.get("repo") ?? "facebook/react";
    const repoName = repo.replace("https://github.com/", "");
    
    const [activeTab, setActiveTab] = useState<TabKey>("overview");
    const [data] = useState<RepoData>(MOCK_REPO_DATA);

    const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
        { key: "overview", label: "Overview", icon: LayoutDashboard },
        { key: "structure", label: "Structure", icon: FolderTree },
        { key: "techstack", label: "Tech Stack", icon: Layers },
        { key: "files", label: "Important Files", icon: FileSearch },
    ];
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