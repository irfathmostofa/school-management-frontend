import { Button } from "@/components/ui/button";

export function PageHeader({ title, description, action, onAction, extra }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {extra}
        {action ? (
          <Button onClick={onAction}>{action}</Button>
        ) : null}
      </div>
    </div>
  );
}
