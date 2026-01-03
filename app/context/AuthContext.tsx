import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi } from "../services/authServices";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const raw = await AsyncStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginApi(email, password);

    if (res.status) {
      await AsyncStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      router.replace("/(main)/home");
    } else {
      alert(res.message);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
