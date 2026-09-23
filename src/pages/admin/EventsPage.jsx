import { ResourcePage } from "@/features/resource/ResourcePage";

export function EventsPage() {
  return (
    <ResourcePage
      title="Events"
      description="Events from /server/getEvents."
      actionLabel="Add event"
      listPath="/server/getEvents"
      createPath="/server/addEvents"
      queryKey="events"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Event", key: "ename" },
        { header: "ID", key: "event_id" },
        { header: "Start", key: "sdate" },
        { header: "End", key: "edate" },
        { header: "Location", key: "elocation" },
      ]}
      fields={[
        { name: "event_id", label: "Event ID" },
        { name: "ename", label: "Event name" },
        { name: "sdate", label: "Start date", type: "date" },
        { name: "edate", label: "End date", type: "date" },
        { name: "elocation", label: "Location" },
        { name: "epurpose", label: "Purpose" },
      ]}
    />
  );
}
