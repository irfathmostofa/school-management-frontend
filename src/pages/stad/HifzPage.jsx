import { ResourcePage } from "@/features/resource/ResourcePage";

export function HifzPage() {
  return (
    <ResourcePage
      title="Hifz progress"
      description="Daily Hifz progress from /server/getHifzDailyProgress."
      actionLabel="Add progress"
      listPath="/server/getHifzDailyProgress"
      createPath="/server/postHifzDailyProgress"
      deletePath="/server/deleteHifzDailyProgress"
      queryKey="hifz"
      filterKeys={["session", "campus", "halakah_id"]}
      columns={[
        { header: "Student", key: "student_id" },
        { header: "Date", key: "date" },
        { header: "Daily", key: "daily" },
        { header: "Previous", key: "previous" },
        { header: "Halakah", key: "halakah_id" },
        { header: "Term", key: "term" },
      ]}
      fields={[
        { name: "student_id", label: "Student ID" },
        { name: "campus", label: "Campus", type: "select", lookup: "campus" },
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "date", label: "Date", type: "date" },
        { name: "dailyJuzz", label: "Daily juzz" },
        { name: "daily", label: "Daily" },
        { name: "previousJuzz", label: "Previous juzz" },
        { name: "previous", label: "Previous" },
        { name: "oldJuzz", label: "Old juzz" },
        { name: "old", label: "Old" },
        { name: "halakah_id", label: "Halakah ID" },
        { name: "term", label: "Term" },
        { name: "note", label: "Note", type: "textarea" },
      ]}
    />
  );
}
