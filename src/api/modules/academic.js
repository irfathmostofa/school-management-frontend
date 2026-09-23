import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { post } from "@/api/client";
import { keys } from "@/api/keys";
import { unwrapList } from "@/lib/utils";

export function useClasses(filters) {
  return useQuery({
    queryKey: keys.classes(filters),
    queryFn: () => post("/server/getClass", filters || {}),
    select: unwrapList,
  });
}

export function useAddClass() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => post("/server/addClass", body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Class saved");
    },
  });
}
