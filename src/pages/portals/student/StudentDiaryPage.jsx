import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function StudentDiaryPage() {
  const date = new Date().toISOString().slice(0, 10);
  return (
    <PortalDataPage
      title="Diary"
      description="Today's class diary notes."
      path="/server/student/getStudentDiary"
      queryKey="student-diary"
      buildBody={(user) => ({
        student_id: user?.student_id,
        className: user?.className,
        section: user?.section,
        session: user?.session,
        date,
      })}
      columns={[
        { header: "Subject", key: "subject" },
        { header: "Note", key: "note" },
        { header: "Classwork", key: "classwork" },
        { header: "Date", key: "date" },
      ]}
    />
  );
}
