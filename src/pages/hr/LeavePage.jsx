import { ResourcePage } from "@/features/resource/ResourcePage";

export function LeavePage() {
  return (
    <ResourcePage
      title="Leave requests"
      description="Leave from /server/hr/getAllLeaveRequest."
      actionLabel="Create leave"
      listPath="/server/hr/getAllLeaveRequest"
      createPath="/server/hr/createLeaveRequest"
      queryKey="leave"
      searchKey="searchFilter"
      showCampus={false}
      showSession={false}
      filterKeys={["userID", "searchFilter", "selectedFilter"]}
      columns={[
        { header: "Applicant", key: "applicantName" },
        { header: "ID", key: "applicantIdNo" },
        { header: "Type", key: "leaveType" },
        { header: "From", key: "applicantLeaveFrom" },
        { header: "To", key: "applicantLeaveTo" },
        { header: "Days", key: "applicantLeaveTotalDays" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "leaveType", label: "Leave type" },
        { name: "leaveTopic", label: "Topic" },
        { name: "applicantName", label: "Applicant name" },
        { name: "applicantType", label: "Applicant type" },
        { name: "applicantTitle", label: "Title" },
        { name: "applicantIdNo", label: "Applicant ID" },
        { name: "applicantContactNo", label: "Contact" },
        { name: "applicantDepartment", label: "Department", type: "select", lookup: "department" },
        { name: "applicantLeaveFrom", label: "From", type: "date" },
        { name: "applicantLeaveTo", label: "To", type: "date" },
        { name: "applicantReason", label: "Reason", type: "textarea" },
        { name: "applicantDate", label: "Date", type: "date" },
        { name: "applicantLeaveTotalDays", label: "Total days" },
        { name: "role", label: "Role" },
      ]}
    />
  );
}
