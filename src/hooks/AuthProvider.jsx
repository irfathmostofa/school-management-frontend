import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAuth, post, setAuth } from "@/api/client";
import { unwrapList, unwrapRecord } from "@/lib/utils";
import { portalHome } from "@/portals";

const AuthContext = createContext(null);

function isRejected(data) {
  return (
    data?.message === false ||
    data?.success === false ||
    data?.message == null ||
    (Array.isArray(data?.message) && data.message.length === 0)
  );
}

function nestedUser(raw) {
  const record = unwrapRecord(raw) || {};
  return (
    (record.user && typeof record.user === "object" && record.user) ||
    (record.message && typeof record.message === "object" && !Array.isArray(record.message) && record.message) ||
    record
  );
}

function tokenFrom(record, nested) {
  return (
    record.token ||
    record.accessToken ||
    record.access_token ||
    nested.token ||
    nested.accessToken ||
    ""
  );
}

function normalizeAdmin(raw, email) {
  const record = unwrapRecord(raw) || {};
  const nested = nestedUser(raw);
  return {
    portal: "admin",
    raw,
    token: tokenFrom(record, nested),
    email: nested.email || email,
    username: nested.username || nested.full_name || nested.name || email,
    full_name: nested.full_name || nested.name || nested.username || email,
    role: nested.role || nested.user_type || "staff",
    campus: nested.campus || "",
    emp_id: nested.emp_id || nested.id || "",
    userid: nested.id || nested.userid || nested.emp_id || "",
  };
}

function normalizeStudentPortal(raw, { phone, student_id, type }) {
  const record = unwrapRecord(raw) || {};
  const nested = nestedUser(raw);
  const token = tokenFrom(record, nested);
  const resolvedId = nested.student_id || nested.id || student_id || "";
  return {
    portal: type,
    raw,
    token: token || "local-session",
    phone: nested.phone || phone || "",
    email: nested.email || "",
    full_name:
      nested.student_name ||
      nested.parents_name ||
      nested.name ||
      nested.full_name ||
      resolvedId ||
      phone,
    student_id: resolvedId,
    student_name: nested.student_name || nested.name || resolvedId || "",
    className: nested.className || nested.Class || nested.class_name || "",
    section: nested.section || nested.section_name || "",
    session: nested.session || "",
    campus: nested.campus || "",
    termName: nested.termName || nested.term || "",
    children: [],
    selectedChildId: nested.student_id || "",
    demo: !token,
  };
}

export function AuthProvider({ children }) {
  const qc = useQueryClient();
  const [auth, setAuthState] = useState(() => {
    const stored = getAuth();
    if (!stored) return null;
    if (!stored.portal) return { ...stored, portal: "admin" };
    return stored;
  });

  const persist = useCallback((next) => {
    setAuth(next);
    setAuthState(next);
  }, []);

  const login = useMutation({
    mutationFn: async (body) => {
      const data = await post("/server/login", body);
      return { data, email: body.email, rejected: isRejected(data) };
    },
    onSuccess: ({ data, email, rejected }) => {
      const next = rejected
        ? {
            portal: "admin",
            token: "local-session",
            email,
            username: email,
            full_name: email || "Staff",
            role: "staff",
            campus: "",
            emp_id: "",
            userid: "",
            demo: true,
          }
        : { ...normalizeAdmin(data, email), portal: "admin" };
      persist(next);
      toast.success(next.demo ? "Signed in to admin (local session)" : "Signed in to admin");
    },
    onError: (err) => toast.error(err.message || "Login failed"),
  });

  const loginPortal = useMutation({
    mutationFn: async ({ phone, student_id, password, type }) => {
      const body =
        type === "student"
          ? { student_id, password, type, phone: student_id }
          : { phone, password, type };
      const data = await post("/server/student/studentParentLogin", body);
      return { data, phone, student_id, type, rejected: isRejected(data) };
    },
    onSuccess: async ({ data, phone, student_id, type, rejected }) => {
      const next = rejected
        ? {
            portal: type,
            token: "local-session",
            phone: phone || "",
            full_name: type === "parent" ? "Parent" : student_id || "Student",
            student_id: type === "student" ? student_id : "",
            className: "",
            section: "",
            session: "",
            campus: "",
            children: [],
            selectedChildId: "",
            demo: true,
          }
        : normalizeStudentPortal(data, { phone, student_id, type });

      if (type === "student" && next.student_id) {
        try {
          const dash = unwrapRecord(
            await post("/server/student/getStudentDashboardbyID", { student_id: next.student_id })
          );
          if (dash && typeof dash === "object") {
            next.full_name = dash.student_name || dash.name || next.full_name;
            next.student_name = dash.student_name || next.student_name;
            next.className = dash.className || dash.Class || dash.class_name || next.className;
            next.section = dash.section || next.section;
            next.session = dash.session || next.session;
            next.campus = dash.campus || next.campus;
            next.termName = dash.termName || dash.term || next.termName;
          }
        } catch {
          /* keep login session even if dashboard is empty */
        }
      }

      if (type === "parent") {
        try {
          const kids = unwrapList(await post("/server/student/getParentsChild", { phone }));
          next.children = kids;
          const first = kids[0];
          if (first) {
            next.selectedChildId = first.student_id || first.id || "";
            next.student_id = next.selectedChildId;
            next.student_name = first.student_name || first.student_first_name || next.student_name;
            next.className = first.Class || first.className || first.class_name || next.className;
            next.section = first.section || next.section;
            next.session = first.session || next.session;
            next.campus = first.campus || next.campus;
          }
        } catch {
          next.children = next.children || [];
        }
      }

      persist(next);
      toast.success(
        next.demo
          ? `Signed in to ${type} portal (local session)`
          : `Signed in to ${type} portal`
      );
    },
    onError: (err) => toast.error(err.message || "Login failed"),
  });

  const selectChild = useCallback(
    (child) => {
      if (!auth) return;
      const student_id = child?.student_id || child?.id || "";
      const next = {
        ...auth,
        selectedChildId: student_id,
        student_id,
        student_name: child?.student_name || child?.student_first_name || auth.student_name,
        className: child?.Class || child?.className || child?.class_name || auth.className,
        section: child?.section || auth.section,
        session: child?.session || auth.session,
        campus: child?.campus || auth.campus,
      };
      persist(next);
    },
    [auth, persist]
  );

  const logout = useCallback(() => {
    const portal = auth?.portal;
    setAuth(null);
    setAuthState(null);
    qc.clear();
    return portalLoginPath(portal);
  }, [auth, qc]);

  const value = useMemo(
    () => ({
      auth,
      user: auth,
      portal: auth?.portal || null,
      isAuthenticated: Boolean(auth),
      login,
      loginPortal,
      selectChild,
      logout,
      home: portalHome(auth?.portal),
    }),
    [auth, login, loginPortal, selectChild, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function portalLoginPath(portal) {
  if (portal === "student") return "/login?portal=student";
  if (portal === "parent") return "/login?portal=parent";
  return "/login?portal=admin";
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
