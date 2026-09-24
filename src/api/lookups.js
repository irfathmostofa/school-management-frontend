export const LOOKUPS = {
  campus: {
    path: "/server/getCampus",
    valueKey: "campus_name",
    labelKeys: ["campus_name"],
  },
  session: {
    path: "/server/getSession",
    valueKey: "session",
    labelKeys: ["session"],
  },
  sessionActive: {
    path: "/server/getSessionActive",
    valueKey: "session",
    labelKeys: ["session"],
  },
  class: {
    path: "/server/getClass",
    valueKey: "class_name",
    labelKeys: ["class_name"],
    bodyKeys: ["session", "campus"],
  },
  section: {
    path: "/server/getSection",
    valueKey: "section",
    labelKeys: ["section", "section_name", "classname"],
    bodyKeys: ["session", "campus"],
  },
  subject: {
    path: "/server/getSubject",
    valueKey: "subject_name",
    labelKeys: ["subject_name"],
  },
  department: {
    path: "/server/getdepartment",
    valueKey: "department",
    labelKeys: ["department"],
  },
  designation: {
    path: "/server/getAllDesignation",
    valueKey: "designation",
    labelKeys: ["designation"],
  },
  title: {
    path: "/server/getAllTitle",
    valueKey: "title",
    labelKeys: ["title"],
  },
  role: {
    path: "/server/getRole",
    valueKey: "roleName",
    labelKeys: ["roleName"],
  },
  school: {
    path: "/server/getschool",
    valueKey: "school",
    labelKeys: ["school"],
  },
  house: {
    path: "/server/getHouse",
    valueKey: "housename",
    labelKeys: ["housename"],
  },
  category: {
    path: "/server/getCategory",
    valueKey: "category_name",
    labelKeys: ["category_name"],
  },
  club: {
    path: "/server/getClub",
    valueKey: "club_name",
    labelKeys: ["club_name"],
  },
  account: {
    path: "/server/getAccount",
    valueKey: "bank_name",
    labelKeys: ["bank_name", "account_type"],
  },
  incomeHead: {
    path: "/server/getincome_head",
    valueKey: "income_head",
    labelKeys: ["income_head"],
  },
  expenseHead: {
    path: "/server/getExpense_head",
    valueKey: "expense_head",
    labelKeys: ["expense_head"],
  },
  bankAccount: {
    path: "/server/getBankAccount",
    valueKey: "id",
    labelKeys: ["bank_name", "acc_number"],
  },
  discountType: {
    path: "/server/getDiscountType",
    valueKey: "discountType",
    labelKeys: ["discountType"],
  },
  productType: {
    path: "/server/getProductType",
    valueKey: "category",
    labelKeys: ["category", "p_type"],
  },
  supplier: {
    path: "/server/getsupplier",
    valueKey: "name",
    labelKeys: ["name"],
  },
  prefix: {
    path: "/server/getallprefix",
    valueKey: "id_prefix",
    labelKeys: ["id_prefix", "type"],
  },
  route: {
    path: "/server/getRoute",
    valueKey: "id",
    labelKeys: ["route_name", "name"],
  },
  feeType: {
    path: "/server/fetchFeeTypes",
    valueKey: "feeType",
    labelKeys: ["feeType", "name"],
  },
  employee: {
    path: "/server/getAllEmployee",
    valueKey: "emp_id",
    labelKeys: ["emp_fname", "emp_lname", "name", "emp_id"],
    bodyKeys: ["searchText", "campus"],
  },
};

export const CORE_LOOKUPS = [
  "campus",
  "session",
  "sessionActive",
  "subject",
  "department",
  "designation",
  "title",
  "role",
  "school",
  "house",
  "category",
  "club",
  "account",
  "incomeHead",
  "expenseHead",
  "discountType",
  "productType",
  "supplier",
  "prefix",
];

export const STATIC_OPTIONS = {
  gender: ["Male", "Female"],
  paymentMode: ["Cash", "Bank", "Cheque", "Online", "SSL"],
  empType: ["Teacher", "Admin", "Staff"],
  leaveType: ["Casual", "Sick", "Annual", "Maternity", "Unpaid", "Other"],
  status: ["Active", "Inactive"],
};

export function lookupValue(row, def) {
  if (row == null) return "";
  if (typeof row !== "object") return String(row);
  if (def?.valueKey && row[def.valueKey] != null && row[def.valueKey] !== "") {
    return String(row[def.valueKey]);
  }
  for (const key of def?.labelKeys || []) {
    if (row[key] != null && row[key] !== "") return String(row[key]);
  }
  return String(row.id ?? row.campus_id ?? "");
}
