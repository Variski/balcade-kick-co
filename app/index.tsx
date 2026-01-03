import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getUser } from "./utils/storage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const user = await getUser();
      router.replace(user ? "/(main)/home" : "/splash");
    };

    checkLogin();
  }, []);

  return null;
}
