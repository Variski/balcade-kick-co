import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useCart } from "../context/CartContext";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

const IMAGE_BASE_URL =
  "http://192.168.110.49/api-balcade/upload/image";

export default function Cart() {
  const router = useRouter();

  const {
    cart,
    removeFromCart,
    clearCart,
    totalPrice,
    increaseQty,
    decreaseQty,
  } = useCart();

  return (
    <View className="flex-1 bg-white px-5 pt-10">
      {/* HEADER */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-3xl font-bold">My Cart</Text>

        <TouchableOpacity
          onPress={() => router.push("/(main)/home")}
          className="flex-row items-center"
        >
          <Feather name="home" size={22} color="black" />
          <Text className="ml-2 font-semibold">Home</Text>
        </TouchableOpacity>
      </View>

      {/* EMPTY STATE */}
      {cart.length === 0 && (
        <View className="flex-1 items-center justify-center">
          <Feather name="shopping-cart" size={60} color="#ccc" />
          <Text className="text-gray-400 mt-4 text-lg">
            Cart masih kosong
          </Text>
        </View>
      )}

      {/* CART LIST */}
      <FlatList
        data={cart}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : index.toString()
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-3">
            <View className="flex-row">
              {/* IMAGE */}
              <Image
                source={{
                  uri: `${IMAGE_BASE_URL}/${item.image}`,
                }}
                className="w-20 h-20 rounded-lg bg-gray-200 mr-4"
                resizeMode="cover"
              />

              {/* INFO */}
              <View className="flex-1">
                <Text className="font-semibold text-gray-800">
                  {item.name}
                </Text>

                <View className="flex-row justify-between items-center mt-3">
                  {/* QTY CONTROL */}
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => decreaseQty(item.id)}
                      className="w-8 h-8 rounded-full bg-black items-center justify-center"
                    >
                      <Feather name="minus" size={16} color="white" />
                    </TouchableOpacity>

                    <Text className="mx-4 font-bold text-lg">
                      {item.qty}
                    </Text>

                    <TouchableOpacity
                      onPress={() => increaseQty(item.id)}
                      className="w-8 h-8 rounded-full bg-black items-center justify-center"
                    >
                      <Feather name="plus" size={16} color="white" />
                    </TouchableOpacity>
                  </View>

                  {/* PRICE & REMOVE */}
                  <View className="items-end">
                    <Text className="font-bold text-black">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </Text>

                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                      className="flex-row items-center mt-2"
                    >
                      <Feather
                        name="trash-2"
                        size={16}
                        color="#ef4444"
                      />
                      <Text className="text-red-500 ml-1 text-sm">
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      {/* FOOTER */}
      {cart.length > 0 && (
        <View className="border-t border-gray-200 pt-4 mt-2">
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-semibold">Total</Text>
            <Text className="text-lg font-bold">
              Rp {totalPrice.toLocaleString("id-ID")}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(main)/checkout")}
            className="bg-black rounded-xl py-4 mb-3"
          >
            <Text className="text-center text-white font-semibold text-lg">
              Checkout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={clearCart}
            className="border border-red-500 rounded-xl py-3 mb-6"
          >
            <Text className="text-center text-red-500 font-semibold">
              Clear Cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
