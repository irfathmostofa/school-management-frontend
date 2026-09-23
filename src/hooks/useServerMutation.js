import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/api/client";
import { toast } from "sonner";

export function useServerMutation({
  path,
  invalidate,
  successMessage = "Saved",
  files,
}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => {
      if (input && input.body && input.files) {
        return post(path, input.body, input.files);
      }
      return post(path, input, files);
    },
    onSuccess: () => {
      (invalidate || []).forEach((key) => {
        qc.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] });
      });
      if (successMessage) toast.success(successMessage);
    },
    onError: (err) => {
      toast.error(err.message || "Request failed");
    },
  });
}
