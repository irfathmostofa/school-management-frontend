import { toast } from "sonner";

const TOKEN_KEY = "school.auth";

export function getAuth() {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuth(value) {
  if (!value) {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }
  localStorage.setItem(TOKEN_KEY, JSON.stringify(value));
}

export function getToken() {
  const auth = getAuth();
  if (!auth) return "";
  return (
    auth.token ||
    auth.accessToken ||
    auth.access_token ||
    auth.userToken ||
    auth.message?.token ||
    ""
  );
}

function errorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  return (
    data.message ||
    data.error ||
    data.msg ||
    data.resMsg?.error?.message ||
    fallback
  );
}

export async function post(path, body = {}, files) {
  const hasFiles = Boolean(files && Object.keys(files).length);
  const auth = getAuth() || {};
  const token = getToken();
  const headers = {};
  let payload;

  const withAuth = {
    ...(body || {}),
    ...(token && token !== "local-session" && body && body.token == null ? { token } : {}),
  };

  if (hasFiles) {
    payload = new FormData();
    Object.entries(withAuth).forEach(([k, v]) => {
      if (v === undefined || v === null) payload.append(k, "");
      else if (typeof v === "object" && !(v instanceof File) && !(v instanceof Blob)) {
        payload.append(k, JSON.stringify(v));
      } else {
        payload.append(k, v);
      }
    });
    Object.entries(files).forEach(([k, file]) => {
      if (file) payload.append(k, file);
    });
  } else {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(withAuth);
  }

  if (token && token !== "local-session") {
    headers.Authorization = `Bearer ${token}`;
    headers.token = token;
  }

  const res = await fetch(path, {
    method: "POST",
    headers,
    body: payload,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    const msg = errorMessage(data, `Request failed (${res.status})`);
    throw Object.assign(new Error(typeof msg === "string" ? msg : "Request failed"), {
      data,
      status: res.status,
    });
  }
  return data;
}

export async function postOrToast(path, body, files) {
  try {
    return await post(path, body, files);
  } catch (err) {
    toast.error(err.message || "Request failed");
    throw err;
  }
}
