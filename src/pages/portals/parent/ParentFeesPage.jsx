import { PortalDataPage } from "@/features/portal/PortalDataPage";

export function ParentFeesPage() {
  return (
    <PortalDataPage
      title="Fees"
      description="Payments and dues for the selected child."
      path="/server/student/getStudentIncomeById"
      queryKey="parent-fees-page"
      buildBody={(user) => ({ student_id: user?.student_id, session: user?.session })}
      columns={[
        { header: "Head", key: "ihead" },
        { header: "Amount", key: "amount" },
        { header: "Date", key: "date" },
        { header: "Mode", key: "mode" },
        { header: "Note", key: "note" },
      ]}
    />
  );
}
