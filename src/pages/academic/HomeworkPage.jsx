import { ResourcePage } from "@/features/resource/ResourcePage";

export function HomeworkPage() {
  return (
    <ResourcePage
      title="Homework"
      description="Homework from /server/getStudentHomeWork."
      actionLabel="Add homework"
      listPath="/server/getStudentHomeWork"
      createPath="/server/addStudentHomeWork"
      queryKey="homework"
      showClass
      filterKeys={["className", "section", "session", "subject", "termName", "date"]}
      columns={[
        { header: "Title", key: "title" },
        { header: "Class", key: "className" },
        { header: "Section", key: "section" },
        { header: "Subject", key: "subject" },
        { header: "Date", key: "date" },
        { header: "Creator", key: "creatorName" },
      ]}
      fields={[
        { name: "school", label: "School" },
        { name: "className", label: "Class", type: "select", lookup: "class" },
        { name: "termName", label: "Term" },
        { name: "section", label: "Section" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "subject", label: "Subject" },
        { name: "title", label: "Title" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "date", label: "Date", type: "date" },
        { name: "creatorID", label: "Creator ID" },
        { name: "creatorName", label: "Creator name" },
        { name: "media", label: "Media", type: "file" },
      ]}
    />
  );
}
