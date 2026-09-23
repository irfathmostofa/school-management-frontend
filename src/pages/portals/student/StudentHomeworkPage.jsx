import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function StudentHomeworkPage() {
  return (
    <PortalDataPage
      title="Homework"
      description="Assigned homework for your class."
      path="/server/student/getHomeWorkList"
      queryKey="student-homework"
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
