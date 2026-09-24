import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOOKUPS, lookupValue } from "@/api/lookups";
import { optionLabel } from "@/hooks/useLookups";

export function FormSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select",
  labelKeys = [],
  valueKey,
  lookup,
  allowEmpty = true,
}) {
  const def = lookup ? LOOKUPS[lookup] : null;
  const resolvedValueKey = valueKey || def?.valueKey;
  const resolvedLabelKeys = labelKeys.length ? labelKeys : def?.labelKeys || [];
  const items = (options || []).map((row, idx) => {
    if (row == null) return { value: "", label: "" };
    if (typeof row !== "object") {
      return { value: String(row), label: String(row) };
    }
    const val = lookupValue(row, { valueKey: resolvedValueKey, labelKeys: resolvedLabelKeys }) || idx;
    return { value: String(val), label: optionLabel(row, resolvedLabelKeys) };
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
