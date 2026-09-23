import { ResourcePage } from "@/features/resource/ResourcePage";

export function DesignationsPage() {
  return (
    <ResourcePage
      title="Designations"
      description="Designations from /server/getAllDesignation."
      actionLabel="Add designation"
      listPath="/server/getAllDesignation"
      createPath="/server/addDesignation"
      updatePath="/server/hr/editdesignation"
      deletePath="/server/hr/deleteDesg"
      queryKey="designations"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Designation", key: "designation" },
      ]}
      fields={[{ name: "designation", label: "Designation" }]}
    />
  );
}
