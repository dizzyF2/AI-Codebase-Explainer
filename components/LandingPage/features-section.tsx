'use client'

import { FileText, Layers, Monitor } from 'lucide-react'
import { motion } from "framer-motion";

function Features() {
    return (
        <section id="features" className="mx-auto max-w-5xl px-6 pb-24">
            <div className="grid gap-4 md:grid-cols-3">
                {/* Architecture Mapping - large card */}
                <motion.div
                    className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0d1424] p-6 md:col-span-2 md:row-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Monitor className="h-5 w-5 text-slate-300" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                    Architecture Mapping
                </h3>
                <p className="text-sm text-slate-400">
                    Visualizes module dependencies and data flow across your entire
                    repository automatically.
                </p>

                {/* Terminal mockup */}
                <div className="mt-6 rounded-xl border border-white/5 bg-[#060c18] p-4">
                    <div className="mb-3 flex gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-red-500/60" />
                        <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                        <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                        <p className="text-slate-500">Scanning components...</p>
                        <p className="text-emerald-400">
                            ✓ Entry point found: main.tsx
                        </p>
                        <p className="text-slate-500">
                            Parsing internal links (247 files)...
                        </p>
                    </div>
                </div>

                {/* Graph visual placeholder */}
                <div className="mt-4 flex items-end justify-end opacity-20">
                    <div className="relative h-32 w-48">
                        <div className="absolute bottom-4 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-emerald-400/30" />
                        <div className="absolute bottom-0 left-4 h-8 w-8 rounded-full bg-emerald-400/20" />
                        <div className="absolute bottom-0 right-4 h-8 w-8 rounded-full bg-emerald-400/20" />
                    </div>
                </div>
                </motion.div>

                {/* Tech Stack Audit */}
                <motion.div
                    className="rounded-2xl border border-white/8 bg-[#0d1424] p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-800/40 bg-emerald-900/20">
                        <Layers className="h-4 w-4 text-emerald-400" />
                    </div>
                    <h3 className="mb-1 font-semibold text-white">Tech Stack Audit</h3>
                    <p className="text-xs text-slate-400">
                        Identifies libraries, frameworks, and versions used in the
                        project.
                    </p>
                </motion.div>

                {/* Important Files */}
                <motion.div
                    className="rounded-2xl border border-white/8 bg-[#0d1424] p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-orange-800/40 bg-orange-900/20">
                        <FileText className="h-4 w-4 text-orange-400" />
                    </div>
                    <h3 className="mb-1 font-semibold text-white">Important Files</h3>
                    <p className="text-xs text-slate-400">
                        Highlights the critical business logic that really matters.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

export default Features