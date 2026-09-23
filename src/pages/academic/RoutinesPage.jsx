import { ResourcePage } from "@/features/resource/ResourcePage";

export function RoutinesPage() {
  return (
    <ResourcePage
      title="Routines"
      description="Class routines from /server/getRoutines."
      actionLabel="Add period"
      listPath="/server/getRoutines"
      createPath="/server/addPeriods"
      queryKey="routines"
      showClass
      filterKeys={["class_name", "section_name", "campus", "session"]}
      columns={[
        { header: "Class", key: "class_name" },
        { header: "Section", key: "section_name" },
        { header: "Campus", key: "campus" },
        { header: "Session", key: "session" },
        { header: "Subject", key: "subject" },
        { header: "Teacher", key: "teacher" },
      ]}
      fields={[
        { name: "class_name", label: "Class", type: "select", lookup: "class" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "type", label: "Type" },
        { name: "name", label: "Period name" },
        { name: "start_time", label: "Start time", type: "time" },
        { name: "end_time", label: "End time", type: "time" },
      ]}
    />
  );
}
