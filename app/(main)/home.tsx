import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import HomeNavbar from "../components/HomeNavbar";
import { EvilIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Content from "../components/Content";
import SubContent from "../components/SubContent";
import BrandCarousel from "../components/BrandCarousel";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // 🔥 SIDEBAR

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      if (res && res.status === true && Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectProduct = (name: string) => {
    setSearchQuery(name);
    setShowDropdown(false);
  };

  return (
    <View className="flex-1 bg-white">
      {/* 🔒 NAVBAR */}
      <HomeNavbar onMenuPress={() => setShowSidebar(true)} />

      {/* 🟦 SIDEBAR OVERLAY */}
      {showSidebar && (
        <View className="absolute inset-0 z-50 flex-row">
          {/* Sidebar */}
          <View className="w-3/4 bg-white">
            <Sidebar onClose={() => setShowSidebar(false)} />
          </View>

          {/* Overlay */}
          <TouchableOpacity
            className="flex-1 bg-black/40"
            onPress={() => setShowSidebar(false)}
          />
        </View>
      )}

      {/* 📜 CONTENT */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListHeaderComponent={
          <>
            {/* Free Shipping */}
            <View className="flex items-center mt-4">
              <Text className="text-sm text-gray-500 font-semibold">
                <FontAwesome5
                  name="shipping-fast"
                  size={15}
                  color="gray"
                />{" "}
                Free Shipping
              </Text>
            </View>
            
            {/* Search */}
            <View className="px-4 mt-4 z-10">
              <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3">
                <EvilIcons name="search" size={24} color="#555" />
                <TextInput
                  className="flex-1 text-base text-gray-800 py-2 px-2"
                  placeholder="Cari produk..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={(text) => {
                    setSearchQuery(text);
                    setShowDropdown(text.length > 0);
                  }}
                />
              </View>

              {showDropdown && filteredProducts.length > 0 && (
                <View className="bg-white border border-gray-300 rounded-lg mt-1 max-h-60">
                  <ScrollView>
                    {filteredProducts.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        className="px-3 py-2 border-b border-gray-200"
                        onPress={() => handleSelectProduct(item.name)}
                      >
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <Content />
            <SubContent />
            <BrandCarousel />

            <View className="px-4 mt-10 mb-3">
              <Text className="text-4xl font-bold">PRODUCT</Text>
              <View className="h-[3px] w-full bg-black mt-2 rounded-full" />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View className="w-1/2">
            <ProductCard product={item} />
          </View>
        )}
        ListFooterComponent={<Footer />}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="mt-10" />
          ) : (
            <Text className="text-center text-gray-400 mt-10">
              Produk tidak ditemukan
            </Text>
          )
        }
      />
    </View>
  );
}
