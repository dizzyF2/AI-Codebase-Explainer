
export type TabKey = "overview" | "structure" | "techstack" | "files";

export interface FileNode {
    name: string;
    type: "file" | "folder";
    children?: FileNode[];
    active?: boolean;
}

export interface TechItem {
    name: string;
    category: string;
    icon?: string;
}

export interface ImportantFile {
    name: string;
    description: string;
    ext: string;
    icon?: "gear" | "book" | "rocket" | "code";
}

export interface RepoData {
    repoName: string;
    branch: string;
    stars: string;
    language: string;
    forks: string;
    summary: string;
    summaryDetail: string;
    structure: FileNode[];
    techStack: TechItem[];
    importantFiles: ImportantFile[];
}

export type LoadingStep = {
    label: string;
    status: "done" | "active" | "pending";
};
