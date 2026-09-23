import { PortalShell } from "@/components/layout/PortalShell";

const NAV = [
  { to: "/parent", label: "Family" },
  { to: "/parent/attendance", label: "Attendance" },
  { to: "/parent/homework", label: "Homework" },
  { to: "/parent/diary", label: "Diary" },
  { to: "/parent/fees", label: "Fees" },
  { to: "/parent/news", label: "Notices" },
];

export function ParentShell() {
  return (
    <PortalShell
      title="Parent portal"
      subtitle="Follow your children from one place"
      nav={NAV}
      accent="bg-violet-800"
      homePath="/parent"
    />
  );
}
