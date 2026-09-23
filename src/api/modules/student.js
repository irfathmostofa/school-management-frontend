import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { post } from "@/api/client";
import { unwrapList, unwrapRecord } from "@/lib/utils";

export function studentParentLogin({ phone, student_id, password, type }) {
  const body =
    type === "student"
      ? { student_id, password, type, phone: student_id }
      : { phone, password, type };
  return post("/server/student/studentParentLogin", body);
}

export function useStudentDashboard(student_id) {
  return useQuery({
    queryKey: ["student-dashboard", student_id],
    queryFn: () => post("/server/student/getStudentDashboardbyID", { student_id }),
    enabled: Boolean(student_id),
    select: unwrapRecord,
  });
}

export function useParentChildren(phone) {
  return useQuery({
    queryKey: ["parent-children", phone],
    queryFn: () => post("/server/student/getParentsChild", { phone }),
    enabled: Boolean(phone),
    select: unwrapList,
  });
}

export function useStudentList(key, path, body, enabled = true) {
  return useQuery({
    queryKey: [key, body],
    queryFn: () => post(path, body || {}),
    enabled,
    select: unwrapList,
  });
}

export function useUpdateStudentPassword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => post("/server/student/updatePassword", body),
    onSuccess: () => {
      qc.invalidateQueries();
      toast.success("Password updated");
    },
    onError: (err) => toast.error(err.message || "Update failed"),
  });
}
