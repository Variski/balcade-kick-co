import { api } from "./api";

export const loginApi = (email: string, password: string) => {
  return api("/auth/login.php", "POST", { email, password });
};

export const registerApi = (name: string, email: string, password: string) => {
  return api("/auth/register.php", "POST", { name, email, password });
};
