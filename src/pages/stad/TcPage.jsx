import { ResourcePage } from "@/features/resource/ResourcePage";

export function TcPage() {
  return (
    <ResourcePage
      title="Transfer certificates"
      description="TC records from /server/getTC."
      actionLabel="Add TC"
      listPath="/server/getTC"
      createPath="/server/AddTC"
      queryKey="tc"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Student", key: "sname" },
        { header: "ID", key: "student_id" },
        { header: "Class", key: "Class" },
        { header: "Section", key: "section" },
        { header: "Exit date", key: "exit_date" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "sname", label: "Student name" },
        { name: "Class", label: "Class", type: "select", lookup: "class" },
        { name: "student_id", label: "Student ID" },
        { name: "section", label: "Section", type: "select", lookup: "section" },
        { name: "sibling_info", label: "Sibling info" },
        { name: "reason", label: "Reason", type: "textarea" },
        { name: "exit_date", label: "Exit date", type: "date" },
        { name: "feedback", label: "Feedback", type: "textarea" },
        { name: "status", label: "Status", type: "select", lookup: "status" },
        { name: "pstatus", label: "Principal status" },
        { name: "compile", label: "Compile" },
      ]}
    />
  );
}
