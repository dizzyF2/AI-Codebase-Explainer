import Link from "next/link";
import { Github } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">
                RepoLens
            </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden items-center gap-8 md:flex">
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
        </div>
        </nav>
    );
}
