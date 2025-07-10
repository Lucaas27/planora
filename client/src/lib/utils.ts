import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a given date string or Date object into a human-readable string.
 *
 * @param date - The date to format, as a string or Date object.
 * @param includeTime - Whether to include time in the format. Defaults to false.
 * @returns The formatted date string. If includeTime is true, returns "DD/MM/YYYY, HH:MM", otherwise "DD/MM/YYYY".
 */
export function formatDate(date: string | Date, includeTime: boolean = false): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "short",
    day: "2-digit",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
      timeZone: "UTC", // Ensure consistent formatting regardless of local timezone
    }),
  };

  return includeTime
    ? new Date(date).toLocaleString("en-GB", options)
    : new Date(date).toLocaleDateString("en-GB", options);
}
