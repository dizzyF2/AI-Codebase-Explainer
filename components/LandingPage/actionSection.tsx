'use client'

import { motion } from "motion/react";
import { Monitor, Shield, Zap } from "lucide-react";

function ActionSection() {
    return (
    <section
        id="how-it-works"
        className="mx-auto max-w-5xl px-6 pb-24"
    >
        <div className="grid items-center gap-8 md:grid-cols-2">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
            <h2 className="mb-6 text-3xl font-black leading-tight text-white">
                Designed for Developers, powered by LLMs.
            </h2>
            <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600/20">
                        <Zap className="h-3 w-3 text-indigo-400" />
                    </div>
                    <div>
                        <p className="font-semibold text-white">
                        Zero-Configuration
                        </p>
                        <p className="text-sm text-slate-400">
                        No README reading required. We understand the code directly.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600/20">
                        <Shield className="h-3 w-3 text-emerald-400" />
                    </div>
                    <div>
                        <p className="font-semibold text-white">Security First</p>
                        <p className="text-sm text-slate-400">
                        Read-only access. Your code never leaves the analysis
                        session.
                        </p>
                    </div>
                </div>
            </div>
            </motion.div>

            {/* Analysis Core card */}
            <motion.div
                className="flex items-center justify-center rounded-2xl border border-white/8 bg-[#0d1424] p-10"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
            <div className="text-center">
                <div className="mb-3 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Monitor className="h-7 w-7 text-slate-400" />
                    </div>
                </div>
                <p className="font-mono text-xs tracking-widest text-slate-500">
                    ANALYSIS CORE V2.4
                </p>
            </div>
            </motion.div>
        </div>
    </section>
    )
}

export default ActionSection