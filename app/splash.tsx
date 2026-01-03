import './global.css';
import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login"); // arahkan ke login
    }, 7000); // 7 detik

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-neutral-900 p-6">
      <Image
        source={require("../assets/images/Untitled-2-removebg-preview.png")}
        className="w-48 h-48 mb-6"
        resizeMode="cover"
      />

      <Text className="text-3xl font-extrabold text-white text-center">
        <Text className="text-red-600">Balcade</Text> Kicks Co.
      </Text>

      <Text className="text-lg text-gray-400 mt-3 italic text-center">
        Step Into Your Style
      </Text>
    </View>
  );
}
