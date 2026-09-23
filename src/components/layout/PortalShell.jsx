import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { portalLogin } from "@/portals";

export function PortalShell({
  title,
  subtitle,
  nav,
  accent = "bg-emerald-700",
  homePath,
}) {
  const { user, logout, selectChild } = useAuth();
  const navigate = useNavigate();
  const children = user?.children || [];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <header className={cn("text-white", accent)}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-xs text-white/75">{subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {user?.portal === "parent" && children.length > 0 ? (
              <select
                className="h-9 rounded-md border-0 bg-white/15 px-3 text-sm text-white outline-none"
                value={user.selectedChildId || ""}
                onChange={(e) => {
                  const child = children.find(
                    (row) => String(row.student_id || row.id) === e.target.value
                  );
                  if (child) selectChild(child);
                }}
              >
                {children.map((child) => {
                  const id = child.student_id || child.id;
                  const label =
                    child.student_name ||
                    child.student_first_name ||
                    id;
                  return (
                    <option key={id} value={id} className="text-foreground">
                      {label}
                    </option>
                  );
                })}
              </select>
            ) : null}
            <span className="text-sm">{user?.full_name || user?.phone}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const path = portalLogin(user?.portal);
                logout();
                navigate(path);
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === homePath}
              className={({ isActive }) =>
                cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-white/80 hover:bg-white/10",
                  isActive && "bg-white text-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
