import { ResourcePage } from "@/features/resource/ResourcePage";

export function VisitorsPage() {
  return (
    <ResourcePage
      title="Visitor book"
      description="Visitors from /server/getVisitorBook."
      actionLabel="Add visitor"
      listPath="/server/getVisitorBook"
      createPath="/server/addVisitorBook"
      updatePath="/server/updateVisitorBook"
      deletePath="/server/DeleteVisitorBook"
      queryKey="visitors"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Date", key: "v_date" },
        { header: "Name", key: "name" },
        { header: "Purpose", key: "purpose" },
        { header: "Phone", key: "phone" },
        { header: "In", key: "in_Time" },
        { header: "Out", key: "out_Time" },
      ]}
      fields={[
        { name: "v_date", label: "Date", type: "date" },
        { name: "name", label: "Name" },
        { name: "purpose", label: "Purpose" },
        { name: "phone", label: "Phone" },
        { name: "in_Time", label: "In time" },
        { name: "out_Time", label: "Out time" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
      ]}
    />
  );
}
