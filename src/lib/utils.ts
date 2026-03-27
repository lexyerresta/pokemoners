import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getSearchTerms(query: string) {
  return query.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

export function getDecorationType(name: string) {
  const decorations: ('tape' | 'pin' | 'clip')[] = ['tape', 'pin', 'clip'];
  return decorations[name.length % 3];
}

export function getCardRotation(id: string) {
  const rotations = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[3deg]', 'rotate-[-1deg]'];
  return rotations[id.length % 4];
}

