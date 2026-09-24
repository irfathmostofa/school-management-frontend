import { ResourcePage } from "@/features/resource/ResourcePage";

export function RequisitionsPage() {
  return (
    <ResourcePage
      title="Requisitions"
      description="Requisitions from /server/getrequisionData."
      actionLabel="Submit requisition"
      listPath="/server/getrequisionData"
      createPath="/server/requisitionSubmit"
      queryKey="requisitions"
      filterKeys={["user"]}
      columns={[
        { header: "ID", key: "requisition_id" },
        { header: "Name", key: "name" },
        { header: "Type", key: "type" },
        { header: "Campus", key: "campus" },
        { header: "Expected", key: "expected_date" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "name", label: "Name" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "requisition_id", label: "Requisition ID" },
        { name: "type", label: "Type" },
        { name: "designation", label: "Designation", type: "select", lookup: "designation" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "location", label: "Location" },
        { name: "expected_date", label: "Expected date", type: "date" },
        { name: "compile", label: "Compile" },
        { name: "img1", label: "Image 1", type: "file" },
      ]}
    />
  );
}
