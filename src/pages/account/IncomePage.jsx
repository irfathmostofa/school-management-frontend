import { ResourcePage } from "@/features/resource/ResourcePage";

export function IncomePage() {
  return (
    <ResourcePage
      title="General income"
      description="Income from /server/getGeneralIncomedata."
      actionLabel="Add income"
      listPath="/server/getGeneralIncomedata"
      createPath="/server/addGenaralIncome"
      approvePath="/server/approveIncomeData"
      queryKey="income"
      showCampus={false}
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
        { name: "phead", label: "Head", type: "select", lookup: "incomeHead" },
        { name: "payment_for", label: "Payment for" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "mode", label: "Mode", type: "select", lookup: "paymentMode" },
        { name: "account_id", label: "Account ID" },
        { name: "note", label: "Note", type: "textarea" },
        { name: "amount", label: "Amount" },
        { name: "date", label: "Date", type: "date" },
        { name: "productId", label: "Product ID" },
      ]}
    />
  );
}
