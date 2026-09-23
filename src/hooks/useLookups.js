import { useQuery } from "@tanstack/react-query";
import { post } from "@/api/client";
import { keys } from "@/api/keys";
import { unwrapList } from "@/lib/utils";

function useLookup(key, path, body = {}) {
  return useQuery({
    queryKey: key,
    queryFn: () => post(path, body),
    select: unwrapList,
    staleTime: 60_000,
  });
}

export function useCampuses() {
  return useLookup(keys.campus(), "/server/getCampus");
}

export function useSessions() {
  return useLookup(keys.session(), "/server/getSession");
}

export function useClasses(filters = {}) {
  return useLookup(keys.classes(filters), "/server/getClass", filters);
}

export function useSections(filters = {}) {
  return useLookup(keys.sections(filters), "/server/getSection", filters);
}

export function useDepartments() {
  return useLookup(keys.departments(), "/server/getdepartment");
}

export function useDesignations() {
  return useLookup(keys.designations(), "/server/getAllDesignation");
}

export function optionLabel(row, fallbackKeys = []) {
  if (row == null) return "";
  if (typeof row !== "object") return String(row);
  for (const key of fallbackKeys) {
    if (row[key]) return String(row[key]);
  }
  return (
    row.campus_name ||
    row.name ||
    row.session ||
    row.class_name ||
    row.section ||
    row.department ||
    row.designation ||
    row.title ||
    row.label ||
    String(row.id || "")
  );
}
