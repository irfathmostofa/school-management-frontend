import { NavLink } from "react-router-dom";
import { NAV } from "@/nav";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <p className="text-lg font-semibold tracking-tight">School Admin</p>
        <p className="text-xs text-muted-foreground">Management console</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((group) => (
          <div key={group.title} className="mb-4">
            <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/dashboard"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
                        isActive && "bg-accent text-foreground"
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
