
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

export interface GitHubContent {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string | null;
    type: "file" | "dir" | "symlink" | "submodule";
    _links: {
        self: string;
        git: string;
        html: string;
    };
}


export interface RepoData {
    repoName: string;
    branch: string;
    stars: number;
    forks: number;
    language: string | null;

    summary?: string;
    summaryDetail?: string;

    structure: FileNode[];

    techStack: TechItem[];
    importantFiles: ImportantFile[];

    readmeContent?: string | null;
    packageJsonContent?: string | null;
}

export type LoadingStep = {
    label: string;
    status: "done" | "active" | "pending";
};
