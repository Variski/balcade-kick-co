import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.110.49/api-balcade"; // GANTI IP

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const userStr = await AsyncStorage.getItem("user");
      if (!userStr) return;

      const user = JSON.parse(userStr);

      const res = await fetch(
        `${API_URL}/orders/index.php?user_id=${user.id}`
      );

      const json = await res.json();

      if (json.status) {
        setOrders(json.data);
      }
    } catch (err) {
      console.log("ERROR LOAD ORDERS:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-5 pt-10">
      <Text className="text-3xl font-bold mb-6">My Orders</Text>

      {orders.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-lg">
            Belum ada pesanan
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="border border-gray-200 rounded-xl p-4 mb-4">
              <View className="flex-row justify-between mb-2">
                <Text className="font-bold">
                  Order #{item.id}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {item.created_at}
                </Text>
              </View>

              <Text className="text-gray-600">Address</Text>
              <Text className="mb-2">{item.address}</Text>

              {item.note && (
                <>
                  <Text className="text-gray-600">Note</Text>
                  <Text className="mb-2">{item.note}</Text>
                </>
              )}

              <View className="flex-row justify-between border-t pt-3 mt-3">
                <Text className="font-semibold">Total</Text>
                <Text className="font-bold text-lg">
                  Rp {Number(item.total).toLocaleString("id-ID")}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
