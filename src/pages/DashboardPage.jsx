import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, CalendarOff, Users, Wallet } from "lucide-react";
import { post } from "@/api/client";
import { keys } from "@/api/keys";
import { PageHeader } from "@/components/common/PageHeader";
import { FilterBar } from "@/components/common/FilterBar";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { unwrapList, unwrapRecord } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { PrintButton } from "@/components/common/PrintButton";

const STAT_ICONS = [Users, Wallet, CalendarOff, CalendarDays];

function StatCard({ label, value, index = 0 }) {
  const Icon = STAT_ICONS[index % STAT_ICONS.length];
  return (
    <Card className="relative overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gold" />
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 font-serif text-[1.7rem] font-semibold leading-none text-navy">
            {value ?? "—"}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold">
          <Icon className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}

function pickStats(record) {
  if (!record || typeof record !== "object") return [];
  const skip = new Set(["error", "error2", "error3", "error4", "message"]);
  return Object.entries(record)
    .filter(([k, v]) => !skip.has(k) && (typeof v === "number" || typeof v === "string"))
    .slice(0, 8)
    .map(([k, v]) => ({ label: k.replace(/_/g, " "), value: v }));
}

export function DashboardPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({ campus: user?.campus || "" });

  const stats = useQuery({
    queryKey: keys.dashboard({ campus: filters.campus, kind: "stat" }),
    queryFn: () => post("/server/dashboardStat", { campus: filters.campus }),
  });
  const events = useQuery({
    queryKey: keys.dashboard({ kind: "events" }),
    queryFn: () => post("/server/getDashboardEventNews", {}),
    select: unwrapList,
  });
  const leave = useQuery({
    queryKey: keys.dashboard({ campus: filters.campus, kind: "leave" }),
    queryFn: () => post("/server/getDashboardLeaveRequest", { campus: filters.campus }),
    select: unwrapList,
  });

  const record = unwrapRecord(stats.data);
  const cards = pickStats(record?.resMsg || record);

  const fallback = [
    { label: "Students", value: "—" },
    { label: "Staff", value: "—" },
    { label: "Fees", value: "—" },
    { label: "Leave", value: leave.data?.length ?? "—" },
  ];
  const shown = stats.isLoading
    ? Array.from({ length: 4 }).map((_, i) => ({ label: "Loading", value: "...", index: i }))
    : (cards.length ? cards : fallback);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Live enrolment, staff, and operations at a glance."
        extra={<PrintButton />}
      />
      <FilterBar value={filters} onChange={setFilters} showSession={false} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {shown.map((card, i) => (
          <StatCard key={card.label + i} label={card.label} value={card.value} index={i} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-base font-semibold text-navy">Leave requests</h2>
            <span className="text-[11px] uppercase tracking-[0.16em] text-gold">HR</span>
          </div>
          <DataTable
            columns={[
              { header: "Applicant", key: "applicantName" },
              { header: "Type", key: "leaveType" },
              { header: "From", key: "applicantLeaveFrom" },
              { header: "To", key: "applicantLeaveTo" },
              { header: "Status", key: "status" },
            ]}
            data={leave.data}
            loading={leave.isLoading}
          />
        </section>
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-base font-semibold text-navy">Events and news</h2>
            <span className="text-[11px] uppercase tracking-[0.16em] text-gold">Campus</span>
          </div>
          <DataTable
            columns={[
              { header: "Event", key: "eventName" },
              { header: "Type", key: "eventType" },
              { header: "From", key: "fromDate" },
              { header: "To", key: "toDate" },
            ]}
            data={events.data}
            loading={events.isLoading}
          />
        </section>
      </div>
    </>
  );
}
