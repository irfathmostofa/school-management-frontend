import { ResourcePage } from "@/features/resource/ResourcePage";

export function ExamsPage() {
  return (
    <ResourcePage
      title="Exam schedules"
      description="Exam schedules from /server/getExamSchedule."
      actionLabel="Add schedule"
      listPath="/server/getExamSchedule"
      createPath="/server/addExamSchedule"
      deletePath="/server/deleteExamSchedule"
      queryKey="exams"
      showClass
      columns={[
        { header: "Title", key: "title" },
        { header: "Class", key: "classId" },
        { header: "Term", key: "term" },
        { header: "Session", key: "session" },
      ]}
      fields={[
        { name: "classId", label: "Class", type: "select", lookup: "class" },
        { name: "title", label: "Title" },
        { name: "term", label: "Term" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "compile", label: "Compile" },
        { name: "media", label: "Media", type: "file" },
      ]}
    />
  );
}
