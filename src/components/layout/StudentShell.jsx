import { PortalShell } from "@/components/layout/PortalShell";

const NAV = [
  { to: "/student", label: "Home" },
  { to: "/student/homework", label: "Homework" },
  { to: "/student/classwork", label: "Classwork" },
  { to: "/student/tests", label: "Tests" },
  { to: "/student/attendance", label: "Attendance" },
  { to: "/student/routine", label: "Routine" },
  { to: "/student/diary", label: "Diary" },
  { to: "/student/library", label: "Library" },
  { to: "/student/news", label: "News" },
];

export function StudentShell() {
  return (
    <PortalShell
      title="Student portal"
      subtitle="Your class, work, and school day"
      nav={NAV}
      accent="bg-emerald-700"
      homePath="/student"
    />
  );
}
