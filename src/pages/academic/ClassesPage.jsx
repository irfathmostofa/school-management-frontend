import { ResourcePage } from "@/features/resource/ResourcePage";

export function ClassesPage() {
  return (
    <ResourcePage
      title="Classes"
      description="Academic classes from /server/getClass."
      actionLabel="Add class"
      listPath="/server/getClass"
      createPath="/server/addClass"
      queryKey="classes"
      filterKeys={["session", "campus"]}
      showClass={false}
      columns={[
        { header: "Class", key: "class_name" },
        { header: "Campus", key: "campus" },
        { header: "Type", key: "class_type" },
        { header: "Session", key: "session" },
        { header: "Order", key: "order" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "class_name", label: "Class name" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "class_type", label: "Class type" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "order", label: "Order" },
      ]}
    />
  );
}
