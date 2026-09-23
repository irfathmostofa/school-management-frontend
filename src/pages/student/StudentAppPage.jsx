import { ResourcePage } from "@/features/resource/ResourcePage";

export function StudentAppPage() {
  return (
    <ResourcePage
      title="Student events"
      description="Student-facing news from /server/student/getStudentEventNews."
      listPath="/server/student/getStudentEventNews"
      queryKey="student-events"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Event", key: "eventName" },
        { header: "Type", key: "eventType" },
        { header: "From", key: "fromDate" },
        { header: "To", key: "toDate" },
        { header: "Campus", key: "campus" },
      ]}
      fields={[]}
      createPath={undefined}
    />
  );
}
