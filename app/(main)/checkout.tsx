import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useState } from "react";
import { checkoutOrder } from "../services/orderService";
import { getUser } from "../utils/storage";

export default function Checkout() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();

  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const user = await getUser();
      if (!user) {
        Alert.alert("Error", "User belum login");
        return;
      }

      const payload = {
        user_id: user.id,
        address,
        note,
        items: cart.map((item) => ({
          product_id: item.id,
          qty: item.qty,
          price: item.price,
        })),
      };

      const res = await checkoutOrder(payload);
      console.log("CHECKOUT RESPONSE:", res);

      // 🔥 FIX UTAMA ADA DI SINI
      if (res.status === true) {
        clearCart();

        Alert.alert(
          "Success 🎉",
          "Checkout berhasil",
          [
            {
              text: "OK",
              onPress: () => router.replace("/(main)/home"),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Error",
          res.message || "Checkout gagal, coba lagi"
        );
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Gagal checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-5 pt-10">
      {/* HEADER */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold">Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ADDRESS */}
      <View className="mb-5">
        <Text className="font-semibold mb-2">Shipping Address</Text>
        <TextInput
          placeholder="Masukkan alamat pengiriman"
          value={address}
          onChangeText={setAddress}
          multiline
          className="border border-gray-300 rounded-xl p-3 bg-gray-50"
        />
      </View>

      {/* NOTE */}
      <View className="mb-5">
        <Text className="font-semibold mb-2">Note (Optional)</Text>
        <TextInput
          placeholder="Catatan untuk penjual"
          value={note}
          onChangeText={setNote}
          className="border border-gray-300 rounded-xl p-3 bg-gray-50"
        />
      </View>

      {/* ORDER SUMMARY */}
      <Text className="text-lg font-bold mb-3">Order Summary</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700">
              {item.name} x{item.qty}
            </Text>
            <Text className="font-semibold">
              Rp {(item.price * item.qty).toLocaleString("id-ID")}
            </Text>
          </View>
        )}
      />

      {/* FOOTER */}
      {cart.length > 0 && (
        <View className="border-t border-gray-200 pt-4 mt-4">
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-semibold">Total</Text>
            <Text className="text-lg font-bold">
              Rp {totalPrice.toLocaleString("id-ID")}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleCheckout}
            disabled={!address || loading}
            className={`rounded-xl py-4 mb-8 ${
              address && !loading ? "bg-black" : "bg-gray-400"
            }`}
          >
            <Text className="text-center text-white font-semibold text-lg">
              {loading ? "Processing..." : "Place Order"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
