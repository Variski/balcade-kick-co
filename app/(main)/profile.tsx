import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getUser } from "../utils/storage";
import { useAuth } from "../context/AuthContext";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function Profile() {
  const { logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await getUser();
    setUser(data);
  };

  return (
    <View className="flex-1 bg-white">
      {/* HEADER */}
      <View className="bg-black px-6 py-5 flex-row items-center justify-between">
        <Text className="text-3xl font-bold text-white mt-8">
          Profile
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(main)/home")}
          activeOpacity={0.8}
          className="flex-row items-center border border-white rounded-full px-4 py-2 mt-8"
        >
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text className="ml-2 text-white font-semibold">
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {/* USER CARD */}
        <View className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6">
          <View className="flex-row items-center">
            <View className="w-14 h-14 rounded-full bg-black items-center justify-center">
              <Feather name="user" size={26} color="white" />
            </View>

            <View className="ml-4">
              {/* NAMA USER */}
              <Text className="text-lg font-bold">
                {user?.name || user?.username || "User"}
              </Text>

              {/* EMAIL */}
              <Text className="text-gray-500 text-sm">Email</Text>
              <Text className="text-base font-medium">
                {user?.email || "-"}
              </Text>
            </View>
          </View>
        </View>

        {/* MENU */}
        <View className="bg-white border border-gray-200 rounded-2xl mb-6 overflow-hidden">
          <ProfileItem icon="user" label="My Account" />
          <ProfileItem icon="map-pin" label="Address" />

          {/* ORDERS → HALAMAN ORDERS */}
          <ProfileItem
            icon="shopping-bag"
            label="Orders"
            onPress={() => router.push("/(main)/orders")}
          />

          <ProfileItem icon="settings" label="Settings" />
        </View>

        {/* CREDIT */}
        <View className="border-t border-gray-200 pt-4 mb-6">
          <Text className="text-lg font-bold mb-2">Credit</Text>
          <Text className="text-gray-700">Deva Helal Eka Variski (23081010313)</Text>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          className="bg-red-500 rounded-xl py-4 mb-10"
          onPress={logout}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ===================== */
/* REUSABLE MENU ITEM */
/* ===================== */
function ProfileItem({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center px-5 py-4 border-b border-gray-200"
    >
      <Feather name={icon} size={20} color="#111" />
      <Text className="ml-4 text-base font-medium">{label}</Text>
      <Feather
        name="chevron-right"
        size={18}
        color="#999"
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  );
}
