import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function ParentDiaryPage() {
  const date = new Date().toISOString().slice(0, 10);
  return (
    <PortalDataPage
      title="Class diary"
      description="Diary notes for the selected child."
      path="/server/student/getStudentDiary"
      queryKey="parent-diary"
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
