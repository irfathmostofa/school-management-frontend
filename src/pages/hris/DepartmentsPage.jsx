import { ResourcePage } from "@/features/resource/ResourcePage";

export function DepartmentsPage() {
  return (
    <ResourcePage
      title="Departments"
      description="Departments from /server/getdepartment."
      actionLabel="Add department"
      listPath="/server/getdepartment"
      createPath="/server/adddepartment"
      updatePath="/server/hr/editdepartment"
      deletePath="/server/hr/deleteDept"
      queryKey="departments"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Department", key: "department" },
        { header: "Type", key: "type" },
      ]}
      fields={[
        { name: "department", label: "Department" },
        { name: "type", label: "Type" },
      ]}
    />
  );
}
