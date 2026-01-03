import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function SubContent() {
  const router = useRouter();

  return (
    <View className="px-4 mt-4 mb-1">
      <View className="flex-row justify-between">
        {/* NEW SHOES */}
        <TouchableOpacity
          className="w-[48%] h-48 relative rounded-lg overflow-hidden"
          activeOpacity={0.8}
          // onPress={() => router.push("/(main)/products?category=shoes")}
        >
          <Image
            source={require("../../assets/images/image 6.png")}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Overlay */}
          <View className="absolute inset-0 bg-black/30" />

          {/* Text */}
          <Text className="absolute bottom-2 left-2 text-white font-bold text-lg">
            NEW SHOES
          </Text>
        </TouchableOpacity>

        {/* PROMO PRODUCT */}
        <TouchableOpacity
          className="w-[48%] h-48 relative rounded-lg overflow-hidden"
          activeOpacity={0.8}
          // onPress={() => router.push("/(main)/products?promo=true")}
        >
          <Image
            source={require("../../assets/images/image 3.jpg")}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Overlay */}
          <View className="absolute inset-0 bg-black/30" />

          {/* Text */}
          <Text className="absolute bottom-2 left-2 text-white font-bold text-lg">
            PROMO PRODUCT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
