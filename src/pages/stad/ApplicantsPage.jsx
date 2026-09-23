import { ResourcePage } from "@/features/resource/ResourcePage";

export function ApplicantsPage() {
  return (
    <ResourcePage
      title="Applicants"
      description="Admission applicants from /server/fetchApplicantsAlldata."
      listPath="/server/fetchApplicantsAlldata"
      deletePath="/server/deleteApplicantById"
      queryKey="applicants"
      filterKeys={["status", "search", "campus", "session"]}
      columns={[
        { header: "Form", key: "form_number" },
        { header: "First name", key: "student_first_name" },
        { header: "Last name", key: "student_last_name" },
        { header: "Class", key: "applyforclass" },
        { header: "Campus", key: "campus" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "form_number", label: "Form number" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "student_first_name", label: "First name" },
        { name: "student_last_name", label: "Last name" },
      ]}
      actionLabel={undefined}
      createPath={undefined}
    />
  );
}
