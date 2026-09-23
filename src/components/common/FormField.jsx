import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function FormField({ label, error, children, className, required }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? (
        <Label>
          {label}
          {required ? <span className="text-destructive"> *</span> : null}
        </Label>
      ) : null}
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
