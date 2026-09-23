import { ResourcePage } from "@/features/resource/ResourcePage";

export function RecruitmentPage() {
  return (
    <ResourcePage
      title="Recruitment"
      description="Applicants from /server/hr/getAllRecruitmentApplicantList."
      actionLabel="Add applicant"
      listPath="/server/hr/getAllRecruitmentApplicantList"
      createPath="/server/hr/addRecruitmentApplicant"
      queryKey="recruitment"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Name", key: "applicant_name" },
        { header: "Department", key: "department_name" },
        { header: "Apply for", key: "apply_for" },
        { header: "Date", key: "date" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "applicant_name", label: "Applicant name" },
        { name: "department_name", label: "Department" },
        { name: "apply_for", label: "Apply for" },
        { name: "applicant_cv", label: "CV", type: "file" },
        { name: "date", label: "Date", type: "date" },
        { name: "care_of", label: "Care of" },
      ]}
    />
  );
}
