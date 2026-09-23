import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function ParentHomeworkPage() {
  return (
    <PortalDataPage
      title="Homework"
      description="Homework assigned to the selected child."
      path="/server/student/getHomeWorkList"
      queryKey="parent-homework"
      buildBody={(user) => ({
        className: user?.className,
        section: user?.section,
        session: user?.session,
        student_id: user?.student_id,
        termName: user?.termName,
      })}
      columns={[
        { header: "Title", key: "title" },
        { header: "Subject", key: "subject" },
        { header: "Date", key: "date" },
        { header: "Description", key: "description" },
      ]}
    />
  );
}
