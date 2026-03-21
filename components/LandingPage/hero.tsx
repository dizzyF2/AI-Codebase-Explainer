"use client";

import { motion } from "framer-motion";
import RepoInput from "./repo-input";
import { useState } from "react";
import ExampleRepos from "./example-repos";

export default function Hero() {
    const [repoUrl, setRepoUrl] = useState("");
    return (
        <section className="flex flex-col items-center px-6 pb-24 pt-32 text-center">
            <Hero />

            <motion.div
                className="mt-8 w-full max-w-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <RepoInput value={repoUrl} onChange={setRepoUrl} />
            </motion.div>

            <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <ExampleRepos onSelect={setRepoUrl} />
            </motion.div>
        </section>
    );
}
