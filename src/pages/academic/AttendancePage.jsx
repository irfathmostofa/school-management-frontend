import { ResourcePage } from "@/features/resource/ResourcePage";

export function AttendancePage() {
  return (
    <ResourcePage
      title="Student attendance"
      description="Daily attendance from /server/getstudentattendence."
      listPath="/server/getstudentattendence"
      createPath="/server/addStudentAttendance"
      queryKey="student-attendance"
      showClass
      showSection
      filterKeys={["date", "session", "class_name", "section", "campus"]}
      columns={[
        { header: "Student", key: "student_id" },
        { header: "Name", key: "student_name" },
        { header: "Class", key: "class_name" },
        { header: "Section", key: "section" },
        { header: "Date", key: "date" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "attendanceRecords", label: "Attendance records", type: "textarea" },
      ]}
      actionLabel="Post attendance"
    />
  );
}
