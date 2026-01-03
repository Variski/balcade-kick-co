import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { getUser } from "../utils/storage";
import { useEffect, useState } from "react";

export default function Sidebar({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { logout } = useAuth();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await getUser();
    setUser(data);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      {/* HEADER PROFILE */}
      <View className="mb-8">
        <View className="w-14 h-14 rounded-full bg-black items-center justify-center mb-3">
          <Feather name="user" size={26} color="white" />
        </View>

        <Text className="text-lg font-bold">
          {user?.name || "User"}
        </Text>
        <Text className="text-gray-500 text-sm">
          {user?.email || "-"}
        </Text>
      </View>

      {/* MENU */}
      <View className="space-y-4">
        <SidebarItem
          icon="user"
          label="Profile"
          onPress={() => {
            onClose();
            router.push("/(main)/profile");
          }}
        />
        <SidebarItem
          icon="shopping-bag"
          label="Orders"
          onPress={() => {
            onClose();
            router.push("/(main)/orders");
          }}
        />

        <SidebarItem
          icon="tag"
          label="Brand"
          onPress={() => {
            onClose();
            router.push("/");
          }}
        />

        
      </View>

      {/* LOGOUT (BOTTOM) */}
      <View className="mt-auto pb-10">
        <TouchableOpacity
          onPress={logout}
          className="flex-row items-center px-4 py-3 border border-red-500 rounded-xl"
        >
          <Feather name="log-out" size={20} color="#ef4444" />
          <Text className="ml-3 text-red-500 font-semibold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ===================== */
/* REUSABLE ITEM */
/* ===================== */
function SidebarItem({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center px-4 py-3 rounded-xl bg-gray-50"
    >
      <Feather name={icon} size={20} color="#111" />
      <Text className="ml-4 text-base font-medium">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
