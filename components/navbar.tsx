'use client'

import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-white">
                        RepoLens
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="#features"
                        className="text-sm text-slate-400 underline-offset-4 hover:text-white transition-colors"
                    >
                        Features
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        How it works
                    </Link>
                    <Link
                        href="https://github.com"
                        target="_blank"
                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <Github className="h-4 w-4" />
                        GitHub
                    </Link>
                </div>
                <div></div>

                <button
                    className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="text-center md:hidden bg-[#0a0f1e] border-t border-white/5 px-6 py-4 space-y-3">
                    <Link
                        href="#features"
                        className="block text-sm text-slate-400 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Features
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="block text-sm text-slate-400 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        How it works
                    </Link>
                    <Link
                        href="https://github.com"
                        target="_blank"
                        className="flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <Github className="h-4 w-4" />
                        GitHub
                    </Link>
                </div>
            )}
        </nav>
    );
}