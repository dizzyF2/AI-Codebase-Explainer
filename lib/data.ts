import { RepoData } from "@/types";


export const EXAMPLE_REPOS = [
    "vercel/next.js",
    "facebook/react",
    "supabase/supabase",
];


export const MOCK_REPO_DATA: RepoData = {
    repoName: "facebook/react",
    branch: "main branch",
    stars: "215k",
    language: "TypeScript",
    forks: "45.2k",
    summary:
        "High-performance UI library focusing on component-based architecture and efficient DOM reconciliation.",
    summaryDetail:
        "The React codebase is structured as a monorepo containing multiple packages. The core reconciliation engine, Fiber, utilizes a sophisticated priority-based scheduling mechanism to ensure UI responsiveness.\n\nKey architectural patterns observed include the Virtual DOM implementation, the Hooks registry system for state management, and the SyntheticEvent system which provides cross-browser consistency. The codebase exhibits extreme modularity, with heavy use of the Flow and TypeScript type systems to maintain internal consistency.",
    structure: [
        {
        name: "src",
        type: "folder",
        children: [
            {
            name: "components",
            type: "folder",
            children: [
                { name: "Button.tsx", type: "file" },
                { name: "Layout.tsx", type: "file" },
            ],
            },
            {
            name: "pages",
            type: "folder",
            children: [],
            },
            { name: "lib", type: "folder", children: [] },
            { name: "index.ts", type: "file", active: true },
        ],
        },
        { name: "config", type: "folder", children: [] },
    ],
    techStack: [
        { name: "Next.js", category: "FRAMEWORK" },
        { name: "Prisma", category: "ORM" },
        { name: "Tailwind", category: "CSS" },
        { name: "TypeScript", category: "LANGUAGE" },
        { name: "React", category: "LIBRARY" },
        { name: "ESLint", category: "TOOLING" },
    ],
    importantFiles: [
        {
        name: "package.json",
        description:
            "Defines the core dependencies and build scripts. Critical for understanding the execution environment.",
        ext: "JSON",
        icon: "gear",
        },
        {
        name: "README.md",
        description:
            "The entry point for documentation. Explains installation, usage, and project philosophy.",
        ext: "MD",
        icon: "book",
        },
        {
        name: "src/index.ts",
        description:
            "The main entry point for the application logic. Initializes all core systems and exports.",
        ext: "TS",
        icon: "rocket",
        },
    ],
};

export function isValidGithubUrl(url: string): boolean {
    const pattern =
        /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+(\/.*)?$/;
    return pattern.test(url) || /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(url);
}