export const ADMIN_EMAIL = "admin@cicipet.com.tr";
export const ADMIN_PASSWORD = "CiciPet2024!";

export function checkAdminAuth(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("adminAuth") === "true";
}

export function setAdminAuth(): void {
  localStorage.setItem("adminAuth", "true");
}

export function clearAdminAuth(): void {
  localStorage.removeItem("adminAuth");
}
