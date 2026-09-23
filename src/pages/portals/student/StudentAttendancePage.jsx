import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function StudentAttendancePage() {
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  return (
    <PortalDataPage
      title="Attendance"
      description="Monthly attendance for the signed-in student."
      path="/server/student/getStudentAttendanceByID"
      queryKey="student-attendance-portal"
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
