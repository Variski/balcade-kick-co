  import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
  import { useRouter } from "expo-router";

  const brands = [
    {
      id: "vans",
      name: "Vans",
      image: require("../../assets/images/Logo/vans.jpg"),
    },
    {
      id: "adidas",
      name: "Adidas",
      image: require("../../assets/images/Logo/adidas.jpg"),
    },
    {
      id: "nike",
      name: "Nike",
      image: require("../../assets/images/Logo/nike-sb.jpg"),
    },
    {
      id: "puma",
      name: "Puma",
      image: require("../../assets/images/Logo/puma.jpg"),
    },
    {
      id: "converse",
      name: "Converse",
      image: require("../../assets/images/Logo/converse.jpg"),
    },
    {
      id: "newbalance",
      name: "New Balance",
      image: require("../../assets/images/Logo/new-balance-numeric.jpg"),
    },
  ];

  export default function BrandCarousel() {
  const router = useRouter();

  return (
    <View className="mt-4">
      {/* Title */}
      <View className="px-4 mb-3">
        <Text className="text-4xl font-bold">
          BRAND
        </Text>
        {/* Garis bawah */}
        <View className="h-[3px] w-full bg-black mt-2 rounded-full" />
      </View>

      <FlatList
        data={brands}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="items-center mr-5"
            activeOpacity={0.85}
          >
            {/* LOGO CIRCLE */}
            <View
              className="w-20 h-20 rounded-full bg-white items-center justify-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 4, // Android
              }}
            >
              <Image
                source={item.image}
                className={`rounded-full ${
                  item.id === "puma" ? "w-20 h-20" : "w-12 h-12"
                }`}
                resizeMode="cover"
              />
              
            </View>

            {/* BRAND NAME */}
            <Text className="text-xs mt-2 text-gray-700 font-medium text-center">
              {item.name}
            </Text>
          </TouchableOpacity>
          
        )}
      />
      
    </View>
  );
}