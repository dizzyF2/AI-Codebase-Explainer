import type { RepoData } from "@/types";

const TECH_ICONS: Record<string, string> = {
    "Next.js": "▣",
    Prisma: "{}",
    Tailwind: "✏",
    TypeScript: "JS",
    React: "⚛",
    ESLint: "⚙",
};

const TECH_COLORS: Record<string, string> = {
    FRAMEWORK: "border-blue-800 bg-blue-900/20 text-blue-300",
    ORM: "border-emerald-800 bg-emerald-900/20 text-emerald-300",
    CSS: "border-cyan-800 bg-cyan-900/20 text-cyan-300",
    LANGUAGE: "border-yellow-800 bg-yellow-900/20 text-yellow-300",
    LIBRARY: "border-purple-800 bg-purple-900/20 text-purple-300",
    TOOLING: "border-orange-800 bg-orange-900/20 text-orange-300",
};



export default function TechStackTab({ data }: {data:RepoData}) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.techStack.map((tech) => (
                <div
                    key={tech.name}
                    className={`flex flex-col items-center gap-3 rounded-xl border p-5 transition-colors hover:brightness-110 ${
                        TECH_COLORS[tech.category] ?? "border-white/10 bg-white/5 text-slate-300"
                    }`}
                >
                    <span className="text-2xl font-mono font-bold">
                        {TECH_ICONS[tech.name] ?? "◈"}
                    </span>
                    <div className="text-center">
                        <p className="font-semibold text-white">{tech.name}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-wider opacity-60">
                            {tech.category}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
