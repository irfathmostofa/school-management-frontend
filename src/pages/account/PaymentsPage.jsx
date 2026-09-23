import { ResourcePage } from "@/features/resource/ResourcePage";

export function PaymentsPage() {
  return (
    <ResourcePage
      title="Payments"
      description="Expenses from /server/getExpensedata."
      actionLabel="Add payment"
      listPath="/server/getExpensedata"
      createPath="/server/addpayment"
      updatePath="/server/UpdateExpensedata"
      deletePath="/server/deletePayment"
      approvePath="/server/approveExpenseData"
      queryKey="payments"
      columns={[
        { header: "Head", key: "phead" },
        { header: "For", key: "payment_for" },
        { header: "Campus", key: "campus" },
        { header: "Amount", key: "amount" },
        { header: "Mode", key: "mode" },
        { header: "Date", key: "date" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "type", label: "Type" },
        { name: "ptype", label: "Payment type" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "phead", label: "Head" },
        { name: "sub_expense_head", label: "Sub head" },
        { name: "payment_for", label: "Payment for" },
        { name: "note", label: "Note", type: "textarea" },
        { name: "amount", label: "Amount" },
        { name: "mode", label: "Mode" },
        { name: "account_id", label: "Account ID" },
        { name: "date", label: "Date", type: "date" },
        { name: "compile", label: "Compile" },
      ]}
    />
  );
}
