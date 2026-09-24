export function EmptyState({ title = "No records yet", description = "Add a record to get started." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-12 text-center">
      <p className="font-serif text-sm font-medium text-navy">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
