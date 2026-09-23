import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/common/FormField";
import { portalHome } from "@/portals";

const COPY = {
  student: {
    kicker: "Student portal",
    title: "Welcome back",
    subtitle: "Homework, diary, attendance, and class news.",
    button: "Enter student portal",
    bg: "from-emerald-700 to-teal-900",
    panel: "bg-emerald-50",
    other: { to: "/parent/login", label: "Parent portal" },
  },
  parent: {
    kicker: "Parent portal",
    title: "Stay close to school",
    subtitle: "See your children, fees, attendance, and notices.",
    button: "Enter parent portal",
    bg: "from-violet-800 to-indigo-950",
    panel: "bg-violet-50",
    other: { to: "/student/login", label: "Student portal" },
  },
};

export function PortalLoginPage({ type }) {
  const { isAuthenticated, auth, loginPortal } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const copy = COPY[type];

  if (isAuthenticated) return <Navigate to={portalHome(auth?.portal)} replace />;

  return (
    <div className={`flex min-h-screen bg-gradient-to-br ${copy.bg}`}>
      <div className="mx-auto flex w-full max-w-5xl flex-col justify-center gap-8 px-6 py-10 lg:flex-row lg:items-center">
        <div className="max-w-md text-white">
          <p className="text-sm uppercase tracking-[0.18em] text-white/70">{copy.kicker}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">{copy.title}</h1>
          <p className="mt-3 text-sm text-white/75">{copy.subtitle}</p>
        </div>
        <Card className={`w-full max-w-md border-0 shadow-xl ${copy.panel}`}>
          <CardHeader>
            <CardTitle>{type === "student" ? "Student sign in" : "Parent sign in"}</CardTitle>
            <CardDescription>Phone and password from school records.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                loginPortal.mutate({ phone, password, type });
              }}
            >
              <FormField label="Phone">
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="01XXXXXXXXX"
                />
              </FormField>
              <FormField label="Password">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </FormField>
              <Button className="w-full" type="submit" disabled={loginPortal.isPending}>
                {loginPortal.isPending ? "Signing in..." : copy.button}
              </Button>
            </form>
            <div className="mt-5 space-y-1 text-center text-sm text-muted-foreground">
              <p>
                Staff? <Link className="text-primary" to="/login">Admin portal</Link>
              </p>
              <p>
                {copy.other.label}? <Link className="text-primary" to={copy.other.to}>Switch</Link>
              </p>
              <p>
                <Link to="/">All portals</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
