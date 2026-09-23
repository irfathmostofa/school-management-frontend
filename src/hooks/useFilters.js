import { useMemo, useState } from "react";

export function useFilters(initial = {}) {
  const [filters, setFilters] = useState(initial);
  const value = useMemo(() => filters, [filters]);
  return {
    filters: value,
    setFilters,
    patch: (next) => setFilters((prev) => ({ ...prev, ...next })),
  };
}
