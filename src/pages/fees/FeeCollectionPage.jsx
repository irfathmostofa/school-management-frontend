import { ResourcePage } from "@/features/resource/ResourcePage";

export function FeeCollectionPage() {
  return (
    <ResourcePage
      title="Fee collection"
      description="Collected fees from /server/getAllCollectedfees."
      actionLabel="Add collection"
      listPath="/server/getAllCollectedfees"
      createPath="/server/addFeesCollection"
      updatePath="/server/updateFeesCollection"
      deletePath="/server/deleteFeesCollection"
      approvePath="/server/approveFeesCollection"
      queryKey="fees"
      showClass
      showSection
      filterKeys={["Class", "section", "startDate", "endDate", "feestype", "session", "payment_mode"]}
      columns={[
        { header: "Student", key: "student_id" },
        { header: "Type", key: "feesType" },
        { header: "Amount", key: "amount" },
        { header: "Paid", key: "paid" },
        { header: "Balance", key: "balance" },
        { header: "Mode", key: "payment_mode" },
        { header: "Date", key: "payment_date" },
        { header: "Status", key: "paymentStatus" },
      ]}
      fields={[
        { name: "student_id", label: "Student ID" },
        { name: "fees_info", label: "Fees info" },
        { name: "feesType", label: "Fee type", type: "select", lookup: "feeType" },
        { name: "due_date", label: "Due date", type: "date" },
        { name: "amount", label: "Amount" },
        { name: "payment_mode", label: "Payment mode", type: "select", lookup: "paymentMode" },
        { name: "accAccount", label: "Account", type: "select", lookup: "account" },
        { name: "payment_date", label: "Payment date", type: "date" },
        { name: "discount", label: "Discount" },
        { name: "fine", label: "Fine" },
        { name: "paid", label: "Paid" },
        { name: "balance", label: "Balance" },
        { name: "paymentStatus", label: "Payment status" },
        { name: "advancePayment", label: "Advance payment" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "compile", label: "Compile" },
      ]}
    />
  );
}
