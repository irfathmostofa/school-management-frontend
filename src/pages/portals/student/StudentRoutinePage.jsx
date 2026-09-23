import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function StudentRoutinePage() {
  return (
    <PortalDataPage
      title="Class routine"
      description="Weekly routine for your class and section."
      path="/server/student/getStudentClasssRoutine"
      queryKey="student-routine"
      buildBody={(user) => ({
        className: user?.className,
        section: user?.section,
        session: user?.session,
      })}
      columns={[
        { header: "Day", key: "day" },
        { header: "Period", key: "period" },
        { header: "Subject", key: "subject" },
        { header: "Teacher", key: "teacher" },
        { header: "Time", key: "time" },
      ]}
    />
  );
}
