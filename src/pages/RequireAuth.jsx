import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { portalHome, portalLogin } from "@/portals";

export function RequireAuth({ portal = "admin", children }) {
  const { isAuthenticated, auth } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={portalLogin(portal)} replace state={{ from: location }} />;
  }
  if (auth?.portal && auth.portal !== portal) {
    return <Navigate to={portalHome(auth.portal)} replace />;
  }
  return children;
}

export function GuestOnly({ children }) {
  const { isAuthenticated, auth } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={portalHome(auth?.portal)} replace />;
  }
  return children;
}
