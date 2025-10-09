import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely serialize data to JSON, converting BigInt to string.
 * Can be extended to handle other non-serializable types.
 */
export function jsonSerialize(data: unknown) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

export function formatDate(date: Date | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function parseHtml(html: string) {
  return decodeEntities(html);
}

export function decodeEntities(encodedString: string) {
  const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = {
      "nbsp":" ",
      "amp" : "&",
      "quot": "\"",
      "lt"  : "<",
      "gt"  : ">"
  };
  return encodedString.replace(translate_re, function(match, entity) {
      return translate[entity as keyof typeof translate];
  }).replace(/&#(\d+);/gi, function(match, numStr) {
      const num = parseInt(numStr, 10);
      return String.fromCharCode(num);
  });
}
