
const TECH_ICON_CHARS: Record<string, string> = {
    "Next.js": "▣",
    Prisma: "{}",
    Tailwind: "✏",
    TypeScript: "JS",
};

function TechMiniCard({ name, category }: { name: string; category: string }) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-white/8 bg-[#111827] p-4 text-center hover:border-white/15 transition-colors">
            <span className="font-mono text-xl font-bold text-slate-300">
                {TECH_ICON_CHARS[name] ?? "◈"}
            </span>
            <div>
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {category}
                </p>
            </div>
        </div>
    );
}

export default TechMiniCard