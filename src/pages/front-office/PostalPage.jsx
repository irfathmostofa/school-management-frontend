import { ResourcePage } from "@/features/resource/ResourcePage";

export function PostalPage() {
  return (
    <ResourcePage
      title="Postal dispatch"
      description="Postal dispatch from /server/getPostalDispatchData."
      actionLabel="Add dispatch"
      listPath="/server/getPostalDispatchData"
      createPath="/server/addPostalDispatch"
      updatePath="/server/UpdatePostalDispatch"
      deletePath="/server/deletePostalDispatchDataById"
      queryKey="postal"
      showCampus={false}
      columns={[
        { header: "To", key: "post_to" },
        { header: "From", key: "post_from" },
        { header: "Ref", key: "ref_no" },
        { header: "Date", key: "date" },
        { header: "Note", key: "note" },
      ]}
      fields={[
        { name: "session", label: "Session", type: "select", lookup: "session" },
        { name: "post_to", label: "Post to" },
        { name: "ref_no", label: "Ref no" },
        { name: "address", label: "Address" },
        { name: "note", label: "Note", type: "textarea" },
        { name: "post_from", label: "Post from" },
        { name: "date", label: "Date", type: "date" },
        { name: "compile", label: "Compile" },
        { name: "img", label: "Image", type: "file" },
      ]}
    />
  );
}
