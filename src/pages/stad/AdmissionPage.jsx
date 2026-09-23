import { ResourcePage } from "@/features/resource/ResourcePage";

export function AdmissionPage() {
  return (
    <ResourcePage
      title="Admission forms"
      description="Sold admission forms from /server/getSoldForm."
      actionLabel="Add sold form"
      listPath="/server/getSoldForm"
      createPath="/server/postSoldForm"
      deletePath="/server/deleteSoldForm"
      idField="form_number"
      queryKey="sold-forms"
      filterKeys={["session", "campus"]}
      columns={[
        { header: "Form", key: "form_number" },
        { header: "First name", key: "first_name" },
        { header: "Last name", key: "last_name" },
        { header: "Class", key: "applyed_class" },
        { header: "Campus", key: "campus" },
        { header: "Sold date", key: "sold_date" },
        { header: "Price", key: "price" },
      ]}
      fields={[
        { name: "form_number", label: "Form number" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "sold_date", label: "Sold date", type: "date" },
        { name: "first_name", label: "First name" },
        { name: "last_name", label: "Last name" },
        { name: "applyed_class", label: "Applied class", type: "select", lookup: "class" },
        { name: "dob", label: "Date of birth", type: "date" },
        { name: "gender", label: "Gender" },
        { name: "father_contact", label: "Father contact" },
        { name: "mother_contact", label: "Mother contact" },
        { name: "price", label: "Price" },
        { name: "mode", label: "Mode" },
        { name: "accNumber", label: "Account number" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "compile", label: "Compile" },
      ]}
    />
  );
}
