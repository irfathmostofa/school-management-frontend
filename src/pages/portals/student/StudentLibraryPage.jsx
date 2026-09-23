import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function StudentLibraryPage() {
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  return (
    <PortalDataPage
      title="Library"
      description="Issued library items."
      path="/server/student/getStudentLibraryItem"
      queryKey="student-library"
      buildBody={(user) => ({
        receiver_id: user?.student_id,
        session: user?.session,
        month,
      })}
      columns={[
        { header: "Item", key: "item" },
        { header: "Issued", key: "issue_date" },
        { header: "Return", key: "return_date" },
        { header: "Status", key: "status" },
      ]}
    />
  );
}
