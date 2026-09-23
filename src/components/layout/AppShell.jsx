import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
          <p className="text-sm text-muted-foreground">Staff admin</p>
          <div className="flex items-center gap-3">
            <span className="text-sm">{user?.full_name || user?.email || "Staff"}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                navigate("/login?portal=admin");
              }}
            >
              Sign out
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
