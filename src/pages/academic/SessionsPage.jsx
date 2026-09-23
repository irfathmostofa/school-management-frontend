import { ResourcePage } from "@/features/resource/ResourcePage";

export function SessionsPage() {
  return (
    <ResourcePage
      title="Sessions"
      description="Academic sessions from /server/getSession."
      actionLabel="Add session"
      listPath="/server/getSession"
      createPath="/server/addSession"
      queryKey="sessions"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Session", key: "session" },
        { header: "Status", key: "status" },
        { header: "Active", key: "active" },
      ]}
      fields={[{ name: "session", label: "Session" }]}
    />
  );
}
