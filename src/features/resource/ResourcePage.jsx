import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { post } from "@/api/client";
import { PageHeader } from "@/components/common/PageHeader";
import { FilterBar } from "@/components/common/FilterBar";
import { DataTable } from "@/components/common/DataTable";
import { FormDialog } from "@/components/common/FormDialog";
import { FormField } from "@/components/common/FormField";
import { FormSection } from "@/components/common/FormSection";
import { FileUpload } from "@/components/common/FileUpload";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSelect } from "@/components/common/FormSelect";
import { useLookupCatalog } from "@/hooks/useLookups";
import { unwrapList } from "@/lib/utils";
import { PrintButton } from "@/components/common/PrintButton";

function emptyForm(fields) {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? "";
    return acc;
  }, {});
}

function FieldControl({ field, value, onChange, lookups }) {
  if (field.type === "textarea") {
    return (
      <Textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
      />
    );
  }
  if (field.type === "select") {
    const options = field.options || lookups[field.lookup] || [];
    return (
      <FormSelect
        value={value || ""}
        onChange={(v) => onChange(v === "all" ? "" : v)}
        options={options}
        lookup={field.lookup}
        placeholder={field.placeholder || field.label}
        allowEmpty={false}
      />
    );
  }
  if (field.type === "file") {
    return <FileUpload file={value} onChange={onChange} />;
  }
  return (
    <Input
      type={field.type || "text"}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
    />
  );
}

export function ResourcePage({
  title,
  description,
  actionLabel = "Add",
  listPath,
  createPath,
  updatePath,
  deletePath,
  approvePath,
  queryKey,
  columns,
  fields,
  idField = "id",
  filterKeys = [],
  showClass = false,
  showSection = false,
  showCampus = true,
  showSession = true,
  searchKey = "search",
  actions,
  listBody,
  successCreate = "Saved",
  successDelete = "Deleted",
}) {
  const qc = useQueryClient();
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(() => emptyForm(fields || []));
  const [files, setFiles] = useState({});
  const [confirm, setConfirm] = useState(null);

  const lookups = useLookupCatalog({ session: filters.session, campus: filters.campus });

  const queryFilters = useMemo(() => {
    const body = { ...(listBody || {}) };
    filterKeys.forEach((key) => {
      if (filters[key]) body[key] = filters[key];
    });
    ["campus", "session", "class_name", "Class", "className", "section", "section_name", "search", "searchFilter", "searchField"].forEach(
      (key) => {
        if (filters[key]) body[key] = filters[key];
      }
    );
    return body;
  }, [filters, filterKeys, listBody]);

  const list = useQuery({
    queryKey: [queryKey, queryFilters],
    queryFn: () => post(listPath, queryFilters),
    select: unwrapList,
  });

  const save = useMutation({
    mutationFn: async () => {
      const path = editing && updatePath ? updatePath : createPath;
      const body = { ...form };
      if (editing && idField) body[idField] = editing[idField] ?? editing.id;
      const filePayload = {};
      (fields || []).forEach((field) => {
        if (field.type === "file" && files[field.name]) filePayload[field.name] = files[field.name];
        if (field.type === "file") delete body[field.name];
      });
      return post(path, body, Object.keys(filePayload).length ? filePayload : undefined);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey] });
      toast.success(successCreate);
      setOpen(false);
      setEditing(null);
    },
    onError: (err) => toast.error(err.message || "Save failed"),
  });

  const remove = useMutation({
    mutationFn: (row) => post(deletePath, { [idField]: row[idField] ?? row.id }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey] });
      toast.success(successDelete);
      setConfirm(null);
    },
    onError: (err) => toast.error(err.message || "Delete failed"),
  });

  const approve = useMutation({
    mutationFn: (row) => post(approvePath, { [idField]: row[idField] ?? row.id, status: "approved" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey] });
      toast.success("Approved");
    },
    onError: (err) => toast.error(err.message || "Approve failed"),
  });

  const tableColumns = (columns || []).map((col) =>
    col.key?.toLowerCase().includes("status") || col.key === "approval"
      ? { ...col, render: (v) => <StatusBadge value={v} /> }
      : col
  );

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm(fields || []));
    setFiles({});
    setOpen(true);
  };

  const handleAction = (action, row) => {
    if (action === "edit") {
      const next = emptyForm(fields || []);
      (fields || []).forEach((field) => {
        if (field.type !== "file") next[field.name] = row[field.name] ?? "";
      });
      setEditing(row);
      setForm(next);
      setFiles({});
      setOpen(true);
    } else if (action === "delete") {
      setConfirm(row);
    } else if (action === "approve") {
      approve.mutate(row);
    }
  };

  const rowActions = actions || [
    ...(updatePath ? ["edit"] : []),
    ...(approvePath ? ["approve"] : []),
    ...(deletePath ? ["delete"] : []),
  ];

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        action={createPath ? actionLabel : undefined}
        onAction={openCreate}
        extra={<PrintButton />}
      />
      <FilterBar
        value={filters}
        onChange={setFilters}
        searchKey={searchKey}
        showCampus={showCampus}
        showSession={showSession}
        showClass={showClass}
        showSection={showSection}
      />
      <DataTable
        columns={tableColumns}
        data={list.data}
        loading={list.isLoading}
        error={list.error}
        onRowAction={rowActions.length ? handleAction : undefined}
        actions={rowActions}
      />
      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? `Edit ${title}` : actionLabel}
        pending={save.isPending}
        onSubmit={() => save.mutate()}
      >
        <FormSection>
          {(fields || []).map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              className={field.type === "textarea" || field.span === 2 ? "sm:col-span-2" : undefined}
            >
              <FieldControl
                field={field}
                value={field.type === "file" ? files[field.name] : form[field.name]}
                lookups={lookups}
                onChange={(v) => {
                  if (field.type === "file") setFiles((prev) => ({ ...prev, [field.name]: v }));
                  else setForm((prev) => ({ ...prev, [field.name]: v }));
                }}
              />
            </FormField>
          ))}
        </FormSection>
      </FormDialog>
      <ConfirmDialog
        open={Boolean(confirm)}
        onOpenChange={() => setConfirm(null)}
        title={`Delete this ${title.toLowerCase()} record?`}
        confirmLabel="Delete"
        pending={remove.isPending}
        onConfirm={() => confirm && remove.mutate(confirm)}
      />
    </>
  );
}
