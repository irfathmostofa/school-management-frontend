import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function unwrapList(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];
  if (Array.isArray(data.message)) return data.message;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.result)) return data.result;
  if (Array.isArray(data.rows)) return data.rows;
  if (data.message && typeof data.message === "object") {
    if (Array.isArray(data.message.data)) return data.message.data;
    if (Array.isArray(data.message.rows)) return data.message.rows;
    if (Array.isArray(data.message.result)) return data.message.result;
  }
  return [];
}

export function unwrapRecord(data) {
  if (!data || typeof data !== "object") return data;
  if (data.message && typeof data.message === "object" && !Array.isArray(data.message)) {
    return data.message;
  }
  if (data.data && typeof data.data === "object" && !Array.isArray(data.data)) {
    return data.data;
  }
  return data;
}

export function cellValue(row, key) {
  if (!row || typeof row !== "object") return "";
  const value = row[key];
  if (value == null || value === "") return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function prettyLabel(key) {
  return String(key)
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
