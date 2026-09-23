import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { post } from "@/api/client";
import { keys } from "@/api/keys";
import { unwrapList } from "@/lib/utils";

export function useUsers() {
  return useQuery({
    queryKey: keys.users(),
    queryFn: () => post("/server/getAlluser", {}),
    select: unwrapList,
  });
}

export function useAddUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => post("/server/adduser", body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.users() });
      toast.success("User saved");
    },
  });
}

export function loginRequest(body) {
  return post("/server/login", body);
}
