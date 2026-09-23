import { ResourcePage } from "@/features/resource/ResourcePage";

export function ProductsPage() {
  return (
    <ResourcePage
      title="Inventory"
      description="Products from /server/getProduct."
      actionLabel="Add product"
      listPath="/server/getProduct"
      createPath="/server/addProduct"
      updatePath="/server/UpdateProduct"
      queryKey="products"
      showCampus={false}
      showSession={false}
      columns={[
        { header: "Item", key: "item" },
        { header: "Product ID", key: "product_id" },
        { header: "Category", key: "cat" },
        { header: "Brand", key: "brand" },
        { header: "Qty", key: "qty" },
        { header: "Price", key: "price" },
        { header: "Type", key: "type" },
      ]}
      fields={[
        { name: "item", label: "Item" },
        { name: "product_id", label: "Product ID" },
        { name: "cat", label: "Category" },
        { name: "brand", label: "Brand" },
        { name: "author", label: "Author" },
        { name: "publisher", label: "Publisher" },
        { name: "publisher_date", label: "Publisher date", type: "date" },
        { name: "bookedition", label: "Edition" },
        { name: "qty", label: "Qty" },
        { name: "price", label: "Price" },
        { name: "type", label: "Type" },
      ]}
    />
  );
}
