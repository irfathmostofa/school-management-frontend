import { Button } from "@/components/ui/button";

export function PageHeader({ title, description, action, onAction, extra }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="mb-2 h-0.5 w-10 rounded-full bg-gold" />
        <h1 className="font-serif text-[1.65rem] font-semibold tracking-tight text-navy">{title}</h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="no-print flex items-center gap-2">
        {extra}
        {action ? (
          <Button onClick={onAction}>{action}</Button>
        ) : null}
      </div>
    </div>
  );
}
