'use client'

import { RepoData, TabKey } from '@/types';
import RepoHeader from '../header/RepoHeader';
import { DashboardContent } from '../tabs/DashboardContent';
import RightPanel from './RightPanel';
import OverviewExtras from '../overview/OverviewExtras';

interface GProps {
    data: RepoData,
    repoName: string,
    activeTab: TabKey,
    setActiveTab: (key: TabKey) => void
}
function MainContent({data, repoName, activeTab, setActiveTab}:GProps) {
    
    return (
    <main className="ml-56 flex-1 min-h-[calc(100vh-3.5rem)] px-8 py-8">
        <RepoHeader data={data} repoName={repoName} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
            <div className="min-w-0">
                <DashboardContent active={activeTab} data={data} />

                {activeTab === "overview" && (
                    <OverviewExtras
                        data={data}
                        onViewAllFiles={() => setActiveTab("files")}
                    />
                )}
            </div>
            <RightPanel data={data}/>
        </div>
    </main>
    )
}

export default MainContent