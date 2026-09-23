import { ResourcePage } from "@/features/resource/ResourcePage";

export function RolesPage() {
  return (
    <ResourcePage
      title="Roles"
      description="Roles from /server/getRole."
      actionLabel="Add role"
      listPath="/server/getRole"
      createPath="/server/addRole"
      queryKey="roles"
      showCampus={false}
      showSession={false}
      columns={[{ header: "Role", key: "roleName" }]}
      fields={[{ name: "roleName", label: "Role name" }]}
    />
  );
}
