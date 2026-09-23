import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

function SheetOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      {...props}
    />
  );
}

const SheetContent = React.forwardRef(function SheetContent(
  { className, children, side = "right", ...props },
  ref
) {
  return (
    <DialogPrimitive.Portal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 flex h-full flex-col gap-4 bg-card p-6 shadow-lg",
          side === "right" && "right-0 top-0 w-full max-w-md border-l",
          side === "left" && "left-0 top-0 w-full max-w-md border-r",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

function SheetHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-2", className)} {...props} />;
}

function SheetTitle({ className, ...props }) {
  return <DialogPrimitive.Title className={cn("text-lg font-semibold", className)} {...props} />;
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle };
