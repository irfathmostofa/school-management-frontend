import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/common/EmptyState";
import { cellValue } from "@/lib/utils";

export function DataTable({
  columns = [],
  data,
  loading,
  error,
  onRowAction,
  actions = ["edit", "delete"],
  emptyTitle,
  emptyDescription,
}) {
  const rows = Array.isArray(data) ? data : [];

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-destructive">
        {error.message || "Failed to load data"}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key || col.header}>{col.header}</TableHead>
            ))}
            {onRowAction ? <TableHead className="w-12 text-right">Actions</TableHead> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                ))}
                {onRowAction ? (
                  <TableCell>
                    <Skeleton className="ml-auto h-4 w-8" />
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (onRowAction ? 1 : 0)}>
                <EmptyState title={emptyTitle} description={emptyDescription} />
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, idx) => (
              <TableRow key={row.id || row._id || row.emp_id || row.student_id || idx}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row[col.key], row) : cellValue(row, col.key)}
                  </TableCell>
                ))}
                {onRowAction ? (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {actions.includes("edit") ? (
                          <DropdownMenuItem onClick={() => onRowAction("edit", row)}>
                            Edit
                          </DropdownMenuItem>
                        ) : null}
                        {actions.includes("approve") ? (
                          <DropdownMenuItem onClick={() => onRowAction("approve", row)}>
                            Approve
                          </DropdownMenuItem>
                        ) : null}
                        {actions.includes("delete") ? (
                          <DropdownMenuItem onClick={() => onRowAction("delete", row)}>
                            Delete
                          </DropdownMenuItem>
                        ) : null}
                        {actions
                          .filter((a) => !["edit", "delete", "approve"].includes(a))
                          .map((a) => (
                            <DropdownMenuItem key={a} onClick={() => onRowAction(a, row)}>
                              {a}
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
