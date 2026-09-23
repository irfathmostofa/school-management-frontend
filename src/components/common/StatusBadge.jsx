import { Badge } from "@/components/ui/badge";

const MAP = {
  approved: "success",
  approve: "success",
  active: "success",
  paid: "success",
  published: "success",
  pending: "warning",
  requested: "warning",
  submitted: "warning",
  rejected: "destructive",
  reject: "destructive",
  inactive: "destructive",
  unpaid: "destructive",
  deleted: "destructive",
};

export function StatusBadge({ value }) {
  if (value == null || value === "") return <span className="text-muted-foreground">—</span>;
  const text = String(value);
  const key = text.toLowerCase();
  const variant = MAP[key] || "secondary";
  return <Badge variant={variant}>{text}</Badge>;
}
