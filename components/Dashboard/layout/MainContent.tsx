'use client'

import { RepoData, TabKey } from '@/types';
import RepoHeader from '../header/RepoHeader';
import { DashboardContent } from '../tabs/DashboardContent';
import RightPanel from './RightPanel';
import OverviewExtras from '../overview/OverviewExtras';

interface GProps {
    data: RepoData
    activeTab: TabKey
    setActiveTab: (key: TabKey) => void
    onAnalyzeClick: () => void
    loadingAI: boolean
    aiData: RepoData | null
}
function MainContent({data, activeTab, setActiveTab, onAnalyzeClick, loadingAI, aiData}:GProps) {
    
    return (
    <main className="ml-56 flex-1 min-h-[calc(100vh-3.5rem)] px-8 py-8">
        <RepoHeader data={data} onAnalyzeClick={onAnalyzeClick} loadingAI={loadingAI} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
            <div className="min-w-0">
                <DashboardContent active={activeTab} data={data} aiData={aiData} />

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