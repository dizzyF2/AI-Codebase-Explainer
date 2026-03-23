import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractRepoInfo(url: string) {
  try {
    const parts = url.replace("https://github.com/", "").split("/");
    return {
      owner: parts[0],
      repo: parts[1],
    };
  } catch {
    return null;
  }
}
