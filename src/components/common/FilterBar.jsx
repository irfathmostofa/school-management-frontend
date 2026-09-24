import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/common/FormSelect";
import { useCampuses, useClasses, useSections, useSessions } from "@/hooks/useLookups";

export function FilterBar({
  value = {},
  onChange,
  searchKey = "search",
  showCampus = true,
  showClass = false,
  showSection = false,
  showSession = true,
  extra,
}) {
  const campuses = useCampuses();
  const sessions = useSessions();
  const classes = useClasses({ session: value.session, campus: value.campus });
  const sections = useSections({ session: value.session, campus: value.campus });
  const patch = (next) => onChange?.({ ...value, ...next });

  return (
    <div className="no-print mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-3 shadow-[0_1px_2px_rgba(16,36,62,0.04)]">
      <div className="min-w-52 flex-1">
        <Input
          placeholder="Search..."
          value={value[searchKey] || value.search || value.searchFilter || value.searchField || ""}
          onChange={(e) =>
            patch({
              [searchKey]: e.target.value,
              search: e.target.value,
              searchFilter: e.target.value,
              searchField: e.target.value,
            })
          }
        />
      </div>
      {showCampus ? (
        <div className="w-44">
          <FormSelect
            value={value.campus || ""}
            onChange={(campus) => patch({ campus: campus === "all" ? "" : campus })}
            options={campuses.data || []}
            lookup="campus"
            placeholder="Campus"
          />
        </div>
      ) : null}
      {showSession ? (
        <div className="w-40">
          <FormSelect
            value={value.session || ""}
            onChange={(session) => patch({ session: session === "all" ? "" : session })}
            options={sessions.data || []}
            lookup="session"
            placeholder="Session"
          />
        </div>
      ) : null}
      {showClass ? (
        <div className="w-40">
          <FormSelect
            value={value.class_name || value.Class || value.className || ""}
            onChange={(class_name) =>
              patch({
                class_name: class_name === "all" ? "" : class_name,
                Class: class_name === "all" ? "" : class_name,
                className: class_name === "all" ? "" : class_name,
              })
            }
            options={classes.data || []}
            lookup="class"
            placeholder="Class"
          />
        </div>
      ) : null}
      {showSection ? (
        <div className="w-40">
          <FormSelect
            value={value.section || value.section_name || ""}
            onChange={(section) =>
              patch({
                section: section === "all" ? "" : section,
                section_name: section === "all" ? "" : section,
              })
            }
            options={sections.data || []}
            lookup="section"
            placeholder="Section"
          />
        </div>
      ) : null}
      {extra}
    </div>
  );
}
