import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/api/client";
import { keys } from "@/api/keys";
import { PageHeader } from "@/components/common/PageHeader";
import { FilterBar } from "@/components/common/FilterBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { unwrapList, unwrapRecord } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

function StatCard({ label, value }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value ?? "—"}</p>
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

  return (
    <>
      <PageHeader title="Dashboard" description="Live campus snapshot from /server/dashboardStat." />
      <FilterBar value={filters} onChange={setFilters} showSession={false} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.isLoading
          ? Array.from({ length: 4 }).map((_, i) => <StatCard key={i} label="Loading" value="..." />)
          : cards.length
            ? cards.map((card) => <StatCard key={card.label} {...card} />)
            : [
                <StatCard key="students" label="Students" value="—" />,
                <StatCard key="staff" label="Staff" value="—" />,
                <StatCard key="fees" label="Fees" value="—" />,
                <StatCard key="leave" label="Leave" value={leave.data?.length ?? "—"} />,
              ]}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold">Leave requests</h2>
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
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Events and news</h2>
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
        </div>
      </div>
    </>
  );
}
