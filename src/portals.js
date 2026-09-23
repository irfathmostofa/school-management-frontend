export const PORTALS = {
  admin: {
    id: "admin",
    name: "Staff Admin",
    home: "/dashboard",
    login: "/login?portal=admin",
  },
  student: {
    id: "student",
    name: "Student",
    home: "/student",
    login: "/login?portal=student",
  },
  parent: {
    id: "parent",
    name: "Parent",
    home: "/parent",
    login: "/login?portal=parent",
  },
};

export function portalHome(portal) {
  return PORTALS[portal]?.home || "/";
}

export function portalLogin(portal) {
  return PORTALS[portal]?.login || "/login";
}
