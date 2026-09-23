import { ResourcePage } from "@/features/resource/ResourcePage";

export function FeeTypesPage() {
  return (
    <ResourcePage
      title="Fee types"
      description="Fee types from /server/fetchFeeTypes."
      actionLabel="Add fee type"
      listPath="/server/fetchFeeTypes"
      createPath="/server/addFeeType"
      updatePath="/server/UpdateFeeTypeById"
      deletePath="/server/deleteFeeTypes"
      queryKey="fee-types"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Type", key: "feeType" },
        { header: "Name", key: "name" },
        { header: "Status", key: "status" },
      ]}
      fields={[{ name: "feeType", label: "Fee type" }]}
    />
  );
}
