import { ResourcePage } from "@/features/resource/ResourcePage";

export function ResignationPage() {
  return (
    <ResourcePage
      title="Resignations"
      description="Resignations from /server/hr/getAllResignRequest."
      actionLabel="Create resignation"
      listPath="/server/hr/getAllResignRequest"
      createPath="/server/hr/createResignation"
      deletePath="/server/hr/deleteResignation"
      idField="applicantIdNo"
      queryKey="resignations"
      showCampus={false}
      showSession={false}
      filterKeys={["userID"]}
      columns={[
        { header: "Applicant", key: "applicantName" },
        { header: "ID", key: "applicantIdNo" },
        { header: "Type", key: "applicantType" },
        { header: "Last day", key: "lastWorkingDay" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "applicantName", label: "Applicant name" },
        { name: "applicantType", label: "Applicant type" },
        { name: "applicantIdNo", label: "Applicant ID" },
        { name: "applicantTitle", label: "Title" },
        { name: "applicantReason", label: "Reason", type: "textarea" },
        { name: "lastWorkingDay", label: "Last working day", type: "date" },
        { name: "e1", label: "E1" },
        { name: "e2", label: "E2" },
        { name: "e3", label: "E3" },
        { name: "s1", label: "S1" },
        { name: "s2", label: "S2" },
        { name: "s3", label: "S3" },
      ]}
    />
  );
}
