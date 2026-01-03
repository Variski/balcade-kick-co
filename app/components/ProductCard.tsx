import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: any) {
  const { addToCart } = useCart();

  return (
    <View className="p-2">
      <View className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <View className="bg-gray-100 p-3">
          <Image
            source={{
              uri: `http://192.168.110.49/api-balcade/upload/image/${product.image}`,
            }}
            className="h-32 w-full"
            resizeMode="contain"
          />
        </View>

        <View className="p-3">
          <View className="self-start bg-gray-200 px-2 py-[2px] rounded-full mb-1">
            <Text className="text-[10px] text-gray-600 font-semibold">
              {product.brand}
            </Text>
          </View>

          <Text
            className="font-semibold text-sm text-gray-800"
            numberOfLines={1}
          >
            {product.name}
          </Text>

          <Text className="font-bold text-base text-black mt-1">
            Rp {product.price}
          </Text>

          <TouchableOpacity
            className="flex-row items-center justify-center bg-black rounded-lg py-2 mt-3"
            onPress={() => addToCart(product)}
          >
            <Feather name="shopping-cart" size={14} color="white" />
            <Text className="text-white text-xs font-semibold ml-2">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
