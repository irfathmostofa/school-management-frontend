import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { optionLabel } from "@/hooks/useLookups";

export function FormSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select",
  labelKeys = [],
  valueKey,
  allowEmpty = true,
}) {
  const items = (options || []).map((row, idx) => {
    if (row == null) return { value: "", label: "" };
    if (typeof row !== "object") {
      return { value: String(row), label: String(row) };
    }
    const val =
      (valueKey && row[valueKey]) ||
      row.campus_name ||
      row.session ||
      row.class_name ||
      row.section ||
      row.department ||
      row.designation ||
      row.name ||
      row.id ||
      idx;
    return { value: String(val), label: optionLabel(row, labelKeys) };
  });

  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allowEmpty ? <SelectItem value="all">All</SelectItem> : null}
        {items
          .filter((item) => item.value && item.value !== "all")
          .map((item, idx) => (
            <SelectItem key={`${item.value}-${idx}`} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
