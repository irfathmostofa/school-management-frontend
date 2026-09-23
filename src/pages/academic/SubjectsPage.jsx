import { ResourcePage } from "@/features/resource/ResourcePage";

export function SubjectsPage() {
  return (
    <ResourcePage
      title="Subjects"
      description="Subjects from /server/getSubject."
      actionLabel="Add subject"
      listPath="/server/getSubject"
      createPath="/server/addSubject"
      updatePath="/server/updateSubject"
      deletePath="/server/deleteSubject"
      queryKey="subjects"
      showClass
      columns={[
        { header: "Subject", key: "subject_name" },
        { header: "Class", key: "class_name" },
        { header: "Campus", key: "campus" },
        { header: "Session", key: "session" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "subject_name", label: "Subject name" },
        { name: "class_name", label: "Class", type: "select", lookup: "class" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
      ]}
    />
  );
}
