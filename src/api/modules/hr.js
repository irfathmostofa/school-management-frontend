import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { post } from "@/api/client";
import { keys } from "@/api/keys";
import { unwrapList } from "@/lib/utils";

export function useEmployees(filters) {
  return useQuery({
    queryKey: keys.employees(filters),
    queryFn: () => post("/server/getAllEmployees", filters || {}),
    select: unwrapList,
  });
}

export function useAddEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body, files) => post("/server/addEmployee", body, files),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee saved");
    },
  });
}

export function useLeave(filters) {
  return useQuery({
    queryKey: keys.leave(filters),
    queryFn: () => post("/server/hr/getAllLeaveRequest", filters || {}),
    select: unwrapList,
  });
}
