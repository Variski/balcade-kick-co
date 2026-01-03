import { View, Image, FlatList, Dimensions, Text } from "react-native";
import { useEffect, useRef, useState } from "react";

const { width } = Dimensions.get("window");

const slides = [
  {
    image: require("../../assets/images/image 2.png"),
    title: "NEW ARRIVAL",
    subtitle: "Balcade Street Collection",
  },
  {
    image: require("../../assets/images/carhartt_251211.jpg"),
    title: "Nike x Carhartt",
    subtitle: "New Collaboration Drop",
  },
  {
    image: require("../../assets/images/cat-skateboards-790x300.jpg"),
    title: "Vans Shoes",
    subtitle: "New Seasonal Arrivals",
  },
];

export default function MainCarousel() {
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % slides.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <View className="mt-4">
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={{ width, height: 180 }}>
            {/* Gambar */}
            <Image
              source={item.image}
              style={{ width, height: 180 }}
              resizeMode="cover"
            />

            {/* Overlay gelap */}
            <View className="absolute inset-0 bg-black/40" />

            {/* Text */}
            <View className="absolute bottom-4 left-4">
              <Text className="text-white text-xl font-bold">
                {item.title}
              </Text>
              <Text className="text-white text-sm">
                {item.subtitle}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
