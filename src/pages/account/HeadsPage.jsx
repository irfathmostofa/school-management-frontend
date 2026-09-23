import { ResourcePage } from "@/features/resource/ResourcePage";

export function HeadsPage() {
  return (
    <ResourcePage
      title="Expense heads"
      description="Expense heads from /server/getExpense_head."
      actionLabel="Add head"
      listPath="/server/getExpense_head"
      createPath="/server/addExpense_head"
      updatePath="/server/updateExpense_head"
      deletePath="/server/deleteExpense_head"
      queryKey="expense-heads"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Head", key: "expense_head" },
        { header: "Parent", key: "parent_id" },
        { header: "Type", key: "expense_type" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "expense_head", label: "Expense head" },
        { name: "parent_id", label: "Parent ID" },
        { name: "expense_type", label: "Expense type" },
      ]}
    />
  );
}
