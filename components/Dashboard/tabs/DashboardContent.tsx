'use client'

import { RepoData, TabKey } from "@/types";
import { motion } from 'framer-motion'
import OverviewTab from "./OverviewTab";
import StructureTab from "./StructureTab";
import TechStackTab from "./TechStackTab";
import ImportantFilesTab from "./ImportantFilesTab";

export function DashboardContent({active,data}: {active: TabKey;data: RepoData;}) {
    return (
        <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
        >
            {active === "overview" && <OverviewTab data={data} />}
            {active === "structure" && <StructureTab data={data} />}
            {active === "techstack" && <TechStackTab data={data} />}
            {active === "files" && <ImportantFilesTab data={data} />}
        </motion.div>
    );
}