import { ResourcePage } from "@/features/resource/ResourcePage";

export function SectionsPage() {
  return (
    <ResourcePage
      title="Sections"
      description="Class sections from /server/getSection."
      actionLabel="Add section"
      listPath="/server/getSection"
      createPath="/server/addSection"
      updatePath="/server/updateSection"
      deletePath="/server/deleteSection"
      queryKey="sections"
      filterKeys={["session", "campus"]}
      columns={[
        { header: "Section", key: "section" },
        { header: "Class", key: "classname" },
        { header: "Session", key: "session" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "section", label: "Section" },
        { name: "classname", label: "Class", type: "select", lookup: "class" },
        { name: "class_id", label: "Class ID" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
      ]}
    />
  );
}
