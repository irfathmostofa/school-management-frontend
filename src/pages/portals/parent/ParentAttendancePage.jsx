import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function ParentAttendancePage() {
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  return (
    <PortalDataPage
      title="Child attendance"
      description="Attendance for the selected child."
      path="/server/student/getStudentAttendanceByID"
      queryKey="parent-attendance"
      buildBody={(user) => ({ student_id: user?.student_id, month })}
      columns={[
        { header: "Date", key: "date" },
        { header: "Status", key: "status" },
        { header: "In", key: "inTime" },
        { header: "Out", key: "outTime" },
      ]}
    />
  );
}
