'use client'

import { RepoData, TabKey } from "@/types";
import { motion } from 'motion/react'
import OverviewTab from "./OverviewTab";
import StructureTab from "./StructureTab";
import TechStackTab from "./TechStackTab";
import ImportantFilesTab from "./ImportantFilesTab";

export function DashboardContent({active,data, aiData}: {active: TabKey;data: RepoData, aiData: RepoData | null}) {
    return (
        <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
        >
            {active === "overview" && <OverviewTab data={data} aiData={aiData} />}
            {active === "structure" && <StructureTab data={data} />}
            {active === "techstack" && <TechStackTab data={data} />}
            {active === "files" && <ImportantFilesTab data={data} />}
        </motion.div>
    );
}