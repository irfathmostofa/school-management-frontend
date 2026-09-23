export function FormSection({ title, children }) {
  return (
    <div className="space-y-3">
      {title ? (
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}
