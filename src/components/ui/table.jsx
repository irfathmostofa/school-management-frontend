import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef(function Table({ className, ...props }, ref) {
  return (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
});

function TableHeader({ className, ...props }) {
  return <thead className={cn("bg-[#f7f3ea] [&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      className={cn("h-10 px-3 text-left align-middle text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/70", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return <td className={cn("p-3 align-middle", className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
