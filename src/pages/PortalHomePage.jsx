import { Link } from "react-router-dom";
import { GraduationCap, Shield, Users } from "lucide-react";
import { GuestOnly } from "@/pages/RequireAuth";

const OPTIONS = [
  {
    to: "/login?portal=admin",
    title: "Staff Admin",
    text: "Manage academics, HR, fees, and operations.",
    icon: Shield,
    tone: "bg-sky-50 text-sky-700 border-sky-100",
  },
  {
    to: "/login?portal=student",
    title: "Student",
    text: "Homework, attendance, diary, and results.",
    icon: GraduationCap,
    tone: "bg-emerald-50 text-emerald-800 border-emerald-100",
  },
  {
    to: "/login?portal=parent",
    title: "Parent",
    text: "Follow your children, fees, and school news.",
    icon: Users,
    tone: "bg-violet-50 text-violet-800 border-violet-100",
  },
];

export function PortalHomePage() {
  return (
    <GuestOnly>
      <div className="flex min-h-screen items-center justify-center bg-[#f3f6fb] p-6">
        <div className="w-full max-w-4xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium text-sky-700">School portals</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Choose how you sign in</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Admin, student, and parent each have a separate login and dashboard.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {OPTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className={`mb-4 inline-flex rounded-xl border p-3 ${item.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </GuestOnly>
  );
}
