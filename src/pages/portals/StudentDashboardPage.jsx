import { useQuery } from "@tanstack/react-query";
import { ClipboardList, Newspaper } from "lucide-react";
import { post } from "@/api/client";
import { useAuth } from "@/hooks/useAuth";
import { unwrapList, unwrapRecord } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { PageHeader } from "@/components/common/PageHeader";
import { PrintButton } from "@/components/common/PrintButton";

function pickStats(record) {
  if (!record || typeof record !== "object") return [];
  return Object.entries(record)
    .filter(([, v]) => typeof v === "number" || typeof v === "string")
    .slice(0, 4)
    .map(([k, v]) => ({ label: k.replace(/_/g, " "), value: v }));
}

export function StudentDashboardPage() {
  const { user } = useAuth();
  const student_id = user?.student_id;
  const className = user?.className;
  const section = user?.section;
  const session = user?.session;

  const dashboard = useQuery({
    queryKey: ["student-dashboard", student_id],
    queryFn: () => post("/server/student/getStudentDashboardbyID", { student_id }),
    enabled: Boolean(student_id),
  });
  const homework = useQuery({
    queryKey: ["student-homework-home", className, section, session, student_id],
    queryFn: () =>
      post("/server/student/getHomeWorkList", {
        className,
        section,
        session,
        student_id,
      }),
    select: unwrapList,
  });
  const news = useQuery({
    queryKey: ["student-news-home"],
    queryFn: () => post("/server/student/getStudentEventNews", {}),
    select: unwrapList,
  });

  const record = unwrapRecord(dashboard.data);
  const cards = pickStats(record);
  const tiles = cards.length
    ? cards
    : [
        { label: "Class", value: className || "—" },
        { label: "Section", value: section || "—" },
        { label: "Session", value: session || "—" },
        { label: "Homework", value: homework.data?.length ?? "—" },
      ];

  return (
    <>
      <PageHeader
        title={`Hi ${user?.full_name || "student"}`}
        description="Your class work, notices, and attendance live here."
        extra={<PrintButton />}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((tile) => (
          <Card key={tile.label} className="border-emerald-100 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{tile.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{tile.value ?? "—"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList className="h-4 w-4" /> Recent homework
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={[
                { header: "Title", key: "title" },
                { header: "Subject", key: "subject" },
                { header: "Date", key: "date" },
              ]}
              data={(homework.data || []).slice(0, 6)}
              loading={homework.isLoading}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Newspaper className="h-4 w-4" /> School news
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={[
                { header: "Event", key: "eventName" },
                { header: "From", key: "fromDate" },
                { header: "To", key: "toDate" },
              ]}
              data={(news.data || []).slice(0, 6)}
              loading={news.isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
