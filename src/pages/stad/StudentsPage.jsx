import { ResourcePage } from "@/features/resource/ResourcePage";

export function StudentsPage() {
  return (
    <ResourcePage
      title="Students"
      description="Admitted students from /server/fetchAdmittedStudents."
      actionLabel="Add student"
      listPath="/server/fetchAdmittedStudents"
      createPath="/server/addstudent"
      queryKey="students"
      showClass
      searchKey="searchField"
      filterKeys={["Class", "section", "session", "campus", "searchField", "page", "limit"]}
      columns={[
        { header: "Student ID", key: "student_id" },
        { header: "First name", key: "student_first_name" },
        { header: "Last name", key: "student_last_name" },
        { header: "Class", key: "Class" },
        { header: "Section", key: "section" },
        { header: "Campus", key: "campus" },
        { header: "Session", key: "session" },
      ]}
      fields={[
        { name: "student_id", label: "Student ID" },
        { name: "student_first_name", label: "First name" },
        { name: "student_last_name", label: "Last name" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "admission_date", label: "Admission date", type: "date" },
        { name: "Class", label: "Class", type: "select", lookup: "class" },
        { name: "section", label: "Section" },
        { name: "category", label: "Category" },
        { name: "dob", label: "Date of birth", type: "date" },
        { name: "age", label: "Age" },
        { name: "gender", label: "Gender" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "father_name", label: "Father name" },
        { name: "mother_name", label: "Mother name" },
        { name: "father_contact", label: "Father contact" },
        { name: "mother_contact", label: "Mother contact" },
      ]}
    />
  );
}
