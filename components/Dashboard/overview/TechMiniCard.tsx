import { TechItem } from "@/types";

const TECH_ICONS: Record<string, string> = {
    "next.js": "▣",
    "prisma": "{}",
    "tailwind": "✏",
    "typescript": "TS",
    "react": "⚛",
    "eslint": "⚙",
};

function TechMiniCard({ tech }: { tech: TechItem }) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-white/8 bg-[#111827] p-4 text-center hover:border-white/15 transition-colors">
            <span className="font-mono text-xl font-bold text-slate-300">
                {TECH_ICONS[tech.name.toLowerCase()] ?? "◈"}
            </span>
            <div>
                <p className="text-sm font-semibold text-white">{tech.name}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {tech.category}
                </p>
            </div>
        </div>
    );
}

export default TechMiniCard