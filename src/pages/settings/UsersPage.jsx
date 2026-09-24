import { ResourcePage } from "@/features/resource/ResourcePage";

export function UsersPage() {
  return (
    <ResourcePage
      title="Users"
      description="Users from /server/getAlluser."
      actionLabel="Add user"
      listPath="/server/getAlluser"
      createPath="/server/adduser"
      deletePath="/server/deleteUser"
      queryKey="users"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Username", key: "username" },
        { header: "Email", key: "email" },
        { header: "Role", key: "role" },
        { header: "Campus", key: "campus" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "username", label: "Username" },
        { name: "emp_id", label: "Employee ID" },
        { name: "mobile", label: "Mobile" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "email", label: "Email" },
        { name: "password", label: "Password", type: "password" },
        { name: "role", label: "Role", type: "select", lookup: "role" },
        { name: "status", label: "Status", type: "select", lookup: "status" },
        { name: "full_name", label: "Full name" },
        { name: "user_type", label: "User type" },
      ]}
    />
  );
}
