import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function StudentTestsPage() {
  return (
    <PortalDataPage
      title="Class tests"
      description="Class test list for your term."
      path="/server/student/getClassTestList"
      queryKey="student-tests"
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
        { header: "Marks", key: "marks" },
        { header: "Date", key: "date" },
      ]}
    />
  );
}
