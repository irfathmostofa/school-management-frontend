import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function StudentClassworkPage() {
  return (
    <PortalDataPage
      title="Classwork"
      description="Classwork posted for your section."
      path="/server/student/getClassWorkList"
      queryKey="student-classwork"
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
