import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FileUpload({ name, file, onChange, accept }) {
  const ref = useRef(null);
  return (
    <div className="flex items-center gap-2">
      <Input
        ref={ref}
        type="file"
        name={name}
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      <Button type="button" variant="outline" onClick={() => ref.current?.click()}>
        Choose file
      </Button>
      <span className="truncate text-sm text-muted-foreground">
        {file?.name || "No file selected"}
      </span>
    </div>
  );
}
