import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCart } from "../context/CartContext";

type Props = {
  onMenuPress: () => void;
};

export default function HomeNavbar({ onMenuPress }: Props) {
  const router = useRouter();
  const { totalQty } = useCart();

  return (
    <View className="flex-row items-center justify-between px-5 py-5 bg-black">
      <TouchableOpacity onPress={onMenuPress} className="pt-8">
        <FontAwesome name="bars" size={24} color="white" />
      </TouchableOpacity>

      <Text className="text-white text-lg font-bold pt-8">
        <Text className="text-red-600">Balcade</Text> Kicks Co
      </Text>

      <View className="flex-row items-center pt-8">
        <TouchableOpacity
          onPress={() => router.push("/(main)/cart")}
          className="mr-5 relative"
        >
          <Feather name="shopping-cart" size={24} color="white" />
          {totalQty > 0 && (
            <View className="absolute -top-2 -right-2 bg-red-600 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
              <Text className="text-white text-xs font-bold">
                {totalQty}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(main)/profile")}>
          <Feather name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
