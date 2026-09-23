import { useQuery } from "@tanstack/react-query";
import { post } from "@/api/client";
import { useAuth } from "@/hooks/useAuth";
import { unwrapList, unwrapRecord } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { PageHeader } from "@/components/common/PageHeader";

export function ParentDashboardPage() {
  const { user, selectChild } = useAuth();
  const student_id = user?.student_id;
  const phone = user?.phone;
  const session = user?.session;

  const children = useQuery({
    queryKey: ["parent-children", phone],
    queryFn: () => post("/server/student/getParentsChild", { phone }),
    select: unwrapList,
  });
  const dashboard = useQuery({
    queryKey: ["parent-child-dashboard", student_id],
    queryFn: () => post("/server/student/getStudentDashboardbyID", { student_id }),
    enabled: Boolean(student_id),
  });
  const fees = useQuery({
    queryKey: ["parent-fees", student_id, session],
    queryFn: () => post("/server/student/getStudentIncomeById", { student_id, session }),
    enabled: Boolean(student_id),
    select: unwrapList,
  });
  const news = useQuery({
    queryKey: ["parent-news"],
    queryFn: () => post("/server/student/getStudentEventNews", {}),
    select: unwrapList,
  });

  const childRows = children.data?.length ? children.data : user?.children || [];
  const record = unwrapRecord(dashboard.data);

  return (
    <>
      <PageHeader
        title="Family overview"
        description="Switch child from the top bar. Fees and notices follow the selected student."
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {childRows.length ? (
          childRows.map((child) => {
            const id = child.student_id || child.id;
            const active = String(id) === String(user?.selectedChildId || user?.student_id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectChild(child)}
                className={`rounded-xl border p-4 text-left ${
                  active ? "border-violet-400 bg-violet-50" : "border-border bg-white"
                }`}
              >
                <p className="font-semibold">
                  {child.student_name || child.student_first_name || id}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {(child.Class || child.className || child.class_name || "Class")} · {child.section || "—"}
                </p>
              </button>
            );
          })
        ) : (
          <Card>
            <CardContent className="pt-5 text-sm text-muted-foreground">
              No linked students yet for this parent phone.
            </CardContent>
          </Card>
        )}
      </div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Selected student</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">{user?.student_name || student_id || "—"}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Class</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">{user?.className || record?.className || "—"}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Fee rows</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">{fees.data?.length ?? "—"}</CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fees and payments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={[
                { header: "Head", key: "ihead" },
                { header: "Amount", key: "amount" },
                { header: "Date", key: "date" },
                { header: "Mode", key: "mode" },
              ]}
              data={fees.data}
              loading={fees.isLoading}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notices</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={[
                { header: "Event", key: "eventName" },
                { header: "From", key: "fromDate" },
                { header: "To", key: "toDate" },
              ]}
              data={news.data}
              loading={news.isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
