import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { printWithBanglaFonts } from "@/lib/print";

export function PrintButton({ label = "Print" }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => printWithBanglaFonts()}
    >
      <Printer className="h-4 w-4" />
      {label}
    </Button>
  );
}
