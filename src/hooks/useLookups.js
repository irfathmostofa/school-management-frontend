import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { post } from "@/api/client";
import { keys } from "@/api/keys";
import { CORE_LOOKUPS, LOOKUPS, STATIC_OPTIONS, lookupValue } from "@/api/lookups";
import { unwrapList } from "@/lib/utils";

function pickBody(def, filters = {}) {
  const body = {};
  (def.bodyKeys || []).forEach((key) => {
    const value = filters[key];
    if (value != null && value !== "") body[key] = value;
  });
  return body;
}

export function optionLabel(row, fallbackKeys = []) {
  if (row == null) return "";
  if (typeof row !== "object") return String(row);
  if (row.bank_name && row.account_type) return `${row.bank_name} (${row.account_type})`;
  if (row.emp_fname || row.emp_lname) {
    return [row.emp_fname, row.emp_lname].filter(Boolean).join(" ") || String(row.emp_id || "");
  }
  for (const key of fallbackKeys) {
    if (row[key] != null && row[key] !== "") return String(row[key]);
  }
  return (
    row.campus_name ||
    row.name ||
    row.session ||
    row.class_name ||
    row.section ||
    row.section_name ||
    row.department ||
    row.designation ||
    row.subject_name ||
    row.roleName ||
    row.school ||
    row.housename ||
    row.category_name ||
    row.club_name ||
    row.income_head ||
    row.expense_head ||
    row.discountType ||
    row.feeType ||
    row.title ||
    row.bank_name ||
    row.label ||
    String(row.id || row.emp_id || row.campus_id || "")
  );
}

export function useLookup(name, filters = {}, options = {}) {
  const def = LOOKUPS[name];
  const body = pickBody(def, filters);
  return useQuery({
    queryKey: keys.lookup(name, body),
    queryFn: () => post(def.path, body),
    select: unwrapList,
    staleTime: 5 * 60_000,
    enabled: Boolean(def) && (options.enabled ?? true),
  });
}

export function useCampuses() {
  return useLookup("campus");
}

export function useSessions() {
  return useLookup("session");
}

export function useActiveSession() {
  return useLookup("sessionActive");
}

export function useClasses(filters = {}) {
  const list = useLookup("class", filters);
  const subjects = useLookup("subject");
  const data = useMemo(() => {
    if (list.data?.length) return list.data;
    const seen = new Set();
    const rows = [];
    for (const row of subjects.data || []) {
      const class_name = row.class_name || row.className;
      if (!class_name || seen.has(class_name)) continue;
      if (filters.campus && row.campus && row.campus !== filters.campus) continue;
      if (filters.session && row.session && row.session !== filters.session) continue;
      seen.add(class_name);
      rows.push({ class_name, campus: row.campus, session: row.session });
    }
    return rows;
  }, [list.data, subjects.data, filters.campus, filters.session]);
  return { ...list, data };
}

export function useSections(filters = {}) {
  const list = useLookup("section", filters);
  const data = useMemo(() => {
    const seen = new Set();
    return (list.data || []).filter((row) => {
      const value = row.section || row.section_name || row.classname;
      if (!value || seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }, [list.data]);
  return { ...list, data };
}

export function useSubjects(filters = {}) {
  return useLookup("subject", filters);
}

export function useDepartments() {
  return useLookup("department");
}

export function useDesignations() {
  return useLookup("designation");
}

export function useTitles() {
  return useLookup("title");
}

export function useRoles() {
  return useLookup("role");
}

export function useSchools() {
  return useLookup("school");
}

export function useHouses() {
  return useLookup("house");
}

export function useCategories() {
  return useLookup("category");
}

export function useClubs() {
  return useLookup("club");
}

export function useAccounts() {
  return useLookup("account");
}

export function useIncomeHeads() {
  return useLookup("incomeHead");
}

export function useExpenseHeads() {
  return useLookup("expenseHead");
}

export function useDiscountTypes() {
  return useLookup("discountType");
}

export function useProductTypes() {
  return useLookup("productType");
}

export function useSuppliers() {
  return useLookup("supplier");
}

export function useFeeTypes() {
  return useLookup("feeType");
}

export function useEmployeesLookup(filters = {}) {
  return useLookup("employee", { searchText: filters.searchText || "", campus: filters.campus || "" });
}

export function useStaticOptions(name) {
  return STATIC_OPTIONS[name] || [];
}

export function useLookupCatalog(filters = {}) {
  const campus = useCampuses();
  const session = useSessions();
  const classes = useClasses({ session: filters.session, campus: filters.campus });
  const sections = useSections({ session: filters.session, campus: filters.campus });
  const subjects = useSubjects();
  const department = useDepartments();
  const designation = useDesignations();
  const title = useTitles();
  const role = useRoles();
  const school = useSchools();
  const house = useHouses();
  const category = useCategories();
  const club = useClubs();
  const account = useAccounts();
  const incomeHead = useIncomeHeads();
  const expenseHead = useExpenseHeads();
  const discountType = useDiscountTypes();
  const productType = useProductTypes();
  const supplier = useSuppliers();
  const feeType = useFeeTypes();

  return {
    campus: campus.data || [],
    session: session.data || [],
    class: classes.data || [],
    section: sections.data || [],
    subject: subjects.data || [],
    department: department.data || [],
    designation: designation.data || [],
    title: title.data || [],
    role: role.data || [],
    school: school.data || [],
    house: house.data || [],
    category: category.data || [],
    club: club.data || [],
    account: account.data || [],
    incomeHead: incomeHead.data || [],
    expenseHead: expenseHead.data || [],
    discountType: discountType.data || [],
    productType: productType.data || [],
    supplier: supplier.data || [],
    feeType: feeType.data || [],
    gender: STATIC_OPTIONS.gender,
    paymentMode: STATIC_OPTIONS.paymentMode,
    empType: STATIC_OPTIONS.empType,
    leaveType: STATIC_OPTIONS.leaveType,
    status: STATIC_OPTIONS.status,
  };
}

export function usePrefetchLookups(enabled) {
  useQueries({
    queries: CORE_LOOKUPS.map((name) => ({
      queryKey: keys.lookup(name, {}),
      queryFn: () => post(LOOKUPS[name].path, {}),
      staleTime: 5 * 60_000,
      enabled,
    })),
  });
}

export { lookupValue };
