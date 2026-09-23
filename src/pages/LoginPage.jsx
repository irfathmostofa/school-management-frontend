import { useMemo, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { GraduationCap, Shield, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/common/FormField";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { portalHome } from "@/portals";
import { cn } from "@/lib/utils";

const PORTAL_TABS = {
  admin: {
    id: "admin",
    label: "Admin",
    icon: Shield,
    kicker: "Staff console",
    title: "School Admin",
    subtitle: "Classes, employees, fees, procurement, and campus operations.",
    formTitle: "Staff sign in",
    formHint: "Use your employee email and password.",
    button: "Enter admin",
    identityLabel: "Email",
    identityType: "email",
    shell: "bg-[#0f2744]",
    panel: "bg-[linear-gradient(180deg,#12385f,#0b1e33)]",
    card: "border-slate-200",
  },
  student: {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    kicker: "Student portal",
    title: "Welcome back",
    subtitle: "Homework, diary, attendance, and class news.",
    formTitle: "Student sign in",
    formHint: "Use your student ID and password.",
    button: "Enter student portal",
    identityLabel: "Student ID",
    identityType: "text",
    shell: "bg-emerald-950",
    panel: "bg-[linear-gradient(180deg,#0f766e,#064e3b)]",
    card: "border-emerald-100 bg-emerald-50/80",
  },
  parent: {
    id: "parent",
    label: "Parent",
    icon: Users,
    kicker: "Parent portal",
    title: "Stay close to school",
    subtitle: "See your children, fees, attendance, and notices.",
    formTitle: "Parent sign in",
    formHint: "Phone and password from school records.",
    button: "Enter parent portal",
    identityLabel: "Phone",
    identityType: "tel",
    shell: "bg-violet-950",
    panel: "bg-[linear-gradient(180deg,#5b21b6,#312e81)]",
    card: "border-violet-100 bg-violet-50/80",
  },
};

function normalizePortal(value) {
  if (value === "student" || value === "parent" || value === "admin") return value;
  return "admin";
}

export function LoginPage() {
  const { isAuthenticated, auth, login, loginPortal } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const portal = normalizePortal(params.get("portal"));
  const copy = PORTALS_SAFE(portal);
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");

  const pending = login.isPending || loginPortal.isPending;

  const theme = useMemo(() => copy, [copy]);

  if (isAuthenticated) return <Navigate to={portalHome(auth?.portal)} replace />;

  const switchPortal = (next) => {
    setIdentity("");
    setPassword("");
    navigate(`/login?portal=${next}`, { replace: true });
  };

  const submit = (e) => {
    e.preventDefault();
    if (portal === "admin") login.mutate({ email: identity, password });
    else if (portal === "student") {
      loginPortal.mutate({ student_id: identity, password, type: "student" });
    } else {
      loginPortal.mutate({ phone: identity, password, type: "parent" });
    }
  };

  return (
    <div className={cn("flex min-h-screen", theme.shell)}>
      <div className={cn("hidden w-[46%] flex-col justify-between p-10 text-white lg:flex", theme.panel)}>
        <p className="text-sm uppercase tracking-[0.2em] text-white/70">{theme.kicker}</p>
        <div>
          <h1 className="text-4xl font-semibold leading-tight">{theme.title}</h1>
          <p className="mt-3 max-w-sm text-sm text-white/70">{theme.subtitle}</p>
        </div>
        <p className="text-xs text-white/50">Switch portal with the tabs on the right</p>
      </div>
      <div className="flex flex-1 items-center justify-center bg-[#eef3f8] p-6">
        <Card className={cn("w-full max-w-md shadow-none", theme.card)}>
          <CardHeader className="space-y-4">
            <Tabs value={portal} onValueChange={switchPortal}>
              <TabsList className="grid h-10 w-full grid-cols-3">
                {Object.values(PORTAL_TABS).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger key={tab.id} value={tab.id} className="gap-1.5">
                      <Icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
            <div>
              <CardTitle>{theme.formTitle}</CardTitle>
              <CardDescription className="mt-1">{theme.formHint}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={submit}>
              <FormField label={theme.identityLabel}>
                <Input
                  type={theme.identityType}
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  autoComplete={portal === "admin" ? "username" : "username"}
                  placeholder={
                    portal === "admin" ? "staff@school.com" : portal === "student" ? "Student ID" : "01XXXXXXXXX"
                  }
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
              <Button className="w-full" type="submit" disabled={pending}>
                {pending ? "Signing in..." : theme.button}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PORTALS_SAFE(portal) {
  return PORTAL_TABS[portal] || PORTAL_TABS.admin;
}
