"use client";

import { motion } from "motion/react";
import RepoInput from "./repo-input";
import { useState } from "react";
import ExampleRepos from "./example-repos";

export default function Hero() {
    const [repoUrl, setRepoUrl] = useState("");
    return (
        <section className="flex flex-col items-center px-6 pb-24 pt-32 text-center">
            <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                        AI-Powered Intelligence
                    </span>
                </div>

                <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                    Understand Any Codebase{" "}
                    <span className="text-white">in Seconds</span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                    Paste a GitHub repository and let AI explain the architecture, tech
                    stack, and important files.
                </p>
            </motion.div>
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
