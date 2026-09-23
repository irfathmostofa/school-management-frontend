import { ResourcePage } from "@/features/resource/ResourcePage";

export function CampusPage() {
  return (
    <ResourcePage
      title="Campuses"
      description="Campuses from /server/getCampus."
      actionLabel="Add campus"
      listPath="/server/getCampus"
      createPath="/server/addCampus"
      updatePath="/server/UpdateCampusById"
      deletePath="/server/DeleteCampusById"
      queryKey="campus"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Campus", key: "campus_name" },
        { header: "Name", key: "name" },
      ]}
      fields={[{ name: "campus_name", label: "Campus name" }]}
    />
  );
}
