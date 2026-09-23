import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function ParentNewsPage() {
  return (
    <PortalDataPage
      title="School notices"
      description="Events shared with parents."
      path="/server/student/getStudentEventNews"
      queryKey="parent-news-page"
      buildBody={() => ({})}
      columns={[
        { header: "Event", key: "eventName" },
        { header: "Type", key: "eventType" },
        { header: "From", key: "fromDate" },
        { header: "To", key: "toDate" },
        { header: "Campus", key: "campus" },
      ]}
    />
  );
}
