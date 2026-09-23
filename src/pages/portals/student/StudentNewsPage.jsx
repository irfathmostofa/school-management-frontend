import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function StudentNewsPage() {
  return (
    <PortalDataPage
      title="Events and news"
      description="School notices for students."
      path="/server/student/getStudentEventNews"
      queryKey="student-news"
      buildBody={() => ({})}
      columns={[
        { header: "Event", key: "eventName" },
        { header: "Type", key: "eventType" },
        { header: "From", key: "fromDate" },
        { header: "To", key: "toDate" },
      ]}
    />
  );
}
