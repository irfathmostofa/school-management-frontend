import { ResourcePage } from "@/features/resource/ResourcePage";

export function EmployeesPage() {
  return (
    <ResourcePage
      title="Employees"
      description="HRIS employees from /server/getAllEmployees."
      actionLabel="Add employee"
      listPath="/server/getAllEmployees"
      createPath="/server/addEmployee"
      updatePath="/server/hr/updateEmployee"
      deletePath="/server/hr/deleteEmployee"
      idField="emp_id"
      queryKey="employees"
      searchKey="searchFilter"
      filterKeys={["campus", "title", "department", "designation", "searchFilter", "emp_type", "page"]}
      columns={[
        { header: "ID", key: "emp_id" },
        { header: "First name", key: "emp_fname" },
        { header: "Last name", key: "emp_lname" },
        { header: "Department", key: "department" },
        { header: "Designation", key: "designation" },
        { header: "Campus", key: "campus" },
        { header: "Type", key: "emp_type" },
        { header: "Status", key: "status" },
      ]}
      fields={[
        { name: "emp_id", label: "Employee ID" },
        { name: "emp_type", label: "Employee type" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "emp_title", label: "Title" },
        { name: "emp_fileNo", label: "File no" },
        { name: "emp_fname", label: "First name" },
        { name: "emp_lname", label: "Last name" },
        { name: "designation", label: "Designation", type: "select", lookup: "designation" },
        { name: "department", label: "Department", type: "select", lookup: "department" },
        { name: "school", label: "School" },
        { name: "gender", label: "Gender" },
        { name: "phone", label: "Phone" },
        { name: "dob", label: "Date of birth", type: "date" },
        { name: "email", label: "Email" },
        { name: "role", label: "Role" },
        { name: "img", label: "Photo", type: "file" },
      ]}
    />
  );
}
