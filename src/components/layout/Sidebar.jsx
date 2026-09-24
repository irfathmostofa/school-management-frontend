import { NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { NAV } from "@/nav";
import { cn } from "@/lib/utils";

export function Sidebar({ onNavigate }) {
  return (
    <aside className="flex h-full w-[272px] shrink-0 flex-col bg-navy-deep text-gold-soft">
      <div className="relative overflow-hidden px-5 pb-5 pt-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-navy-deep shadow-[0_8px_20px_rgba(196,163,90,0.28)]">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-serif text-[17px] font-semibold leading-tight tracking-tight text-[#f7f1e4]">
              School Admin
            </p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-gold">
              Academic console
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4 pt-1 [scrollbar-color:#2a4564_transparent] [scrollbar-width:thin]">
        {NAV.map((group, index) => (
          <div key={group.title} className={cn(index > 0 && "mt-5")}>
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fa3b8]">
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
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[#c3d0de] transition-colors duration-150",
                        "hover:bg-white/5 hover:text-[#f7f1e4]",
                        isActive && "bg-navy-mid text-[#f7f1e4] shadow-[inset_0_0_0_1px_rgba(196,163,90,0.18)]"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gold opacity-0 transition-opacity",
                            isActive && "opacity-100"
                          )}
                        />
                        <Icon
                          className={cn(
                            "h-[15px] w-[15px] shrink-0",
                            isActive ? "text-gold" : "text-[#8fa3b8] group-hover:text-gold-soft"
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">Academic year</p>
        <p className="mt-1 text-xs text-[#8fa3b8]">Management console</p>
      </div>
    </aside>
  );
}
