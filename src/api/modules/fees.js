import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { post } from "@/api/client";
import { keys } from "@/api/keys";
import { unwrapList } from "@/lib/utils";

export function useFees(filters) {
  return useQuery({
    queryKey: keys.fees(filters),
    queryFn: () => post("/server/getAllCollectedfees", filters || {}),
    select: unwrapList,
  });
}

export function useAddFeesCollection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => post("/server/addFeesCollection", body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["fees"] });
      toast.success("Fee collection saved");
    },
  });
}
