import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Wallet,
  Landmark,
  ShoppingCart,
  Package,
  Building2,
  Settings,
  Shield,
  ClipboardList,
  CalendarDays,
  BookOpen,
} from "lucide-react";

export const NAV = [
  {
    title: "Overview",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Academic",
    items: [
      { to: "/academic/classes", label: "Classes", icon: GraduationCap },
      { to: "/academic/sections", label: "Sections", icon: BookOpen },
      { to: "/academic/subjects", label: "Subjects", icon: BookOpen },
      { to: "/academic/sessions", label: "Sessions", icon: CalendarDays },
      { to: "/academic/routines", label: "Routines", icon: CalendarDays },
      { to: "/academic/homework", label: "Homework", icon: ClipboardList },
      { to: "/academic/exams", label: "Exams", icon: ClipboardList },
      { to: "/academic/attendance", label: "Attendance", icon: Users },
    ],
  },
  {
    title: "Students",
    items: [
      { to: "/stad/students", label: "Students", icon: Users },
      { to: "/stad/admission", label: "Admission", icon: ClipboardList },
      { to: "/stad/applicants", label: "Applicants", icon: Users },
      { to: "/stad/hifz", label: "Hifz", icon: BookOpen },
      { to: "/stad/tc", label: "Transfer certificates", icon: ClipboardList },
    ],
  },
  {
    title: "Staff / HR",
    items: [
      { to: "/hris/employees", label: "Employees", icon: Users },
      { to: "/hris/departments", label: "Departments", icon: Building2 },
      { to: "/hris/designations", label: "Designations", icon: Building2 },
      { to: "/hr/leave", label: "Leave", icon: CalendarDays },
      { to: "/hr/recruitment", label: "Recruitment", icon: Users },
      { to: "/hr/resignation", label: "Resignation", icon: ClipboardList },
    ],
  },
  {
    title: "Finance",
    items: [
      { to: "/fees/collection", label: "Fee collection", icon: Wallet },
      { to: "/fees/types", label: "Fee types", icon: Wallet },
      { to: "/account/payments", label: "Payments", icon: Landmark },
      { to: "/account/income", label: "Income", icon: Landmark },
      { to: "/account/heads", label: "Account heads", icon: Landmark },
    ],
  },
  {
    title: "Operations",
    items: [
      { to: "/procurement/requisitions", label: "Requisitions", icon: ShoppingCart },
      { to: "/store/products", label: "Inventory", icon: Package },
      { to: "/front-office/visitors", label: "Visitors", icon: Building2 },
      { to: "/front-office/postal", label: "Postal", icon: Building2 },
      { to: "/admin/events", label: "Events", icon: CalendarDays },
    ],
  },
  {
    title: "System",
    items: [
      { to: "/settings/campus", label: "Campuses", icon: Settings },
      { to: "/settings/users", label: "Users", icon: Shield },
      { to: "/settings/roles", label: "Roles", icon: Shield },
    ],
  },
];
