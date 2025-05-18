import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export function readingTime(html?: string) {
  if (html == null || html.length === 0) {
    return "0 min read";
  }
  const wordCount = html.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const readingTime = (wordCount / 212).toFixed(0);
  return `${readingTime} min read`;
}

export function lerp(start: number, end: number, amount: number) {
  return (1 - amount) * start + amount * end;
}

export type Post = {
  id: string;
  body?: string | undefined;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    tags: string[];
    draft: boolean;
    updatedDate?: Date | undefined;
    heroImage?: string | undefined;
  };
};
