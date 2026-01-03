import { View, Text, TouchableOpacity } from "react-native";

export default function Footer() {
  return (
    <View className="bg-black px-5 pt-10 pb-16">
      
      {/* TOP GRID */}
      <View className="flex-row flex-wrap justify-between">
        
        {/* CONTACT */}
        <View className="w-[48%] mb-8">
          <Text className="font-bold text-base mb-3 text-white">
            Contact us!
          </Text>

          <Text className="text-sm text-gray-300">
            Free Hotline:
          </Text>
          <Text className="font-semibold text-sm mb-2 text-white">
            0812-xxxx-xxxx
          </Text>

          <Text className="text-sm text-gray-300">
            Landline:
          </Text>
          <Text className="font-semibold text-sm mb-2 text-white">
            MIAW MIAW
          </Text>

          <TouchableOpacity>
            <Text className="text-sm text-blue-400 font-semibold mt-1">
              Contact form
            </Text>
          </TouchableOpacity>
        </View>

        {/* SERVICE TIME */}
        <View className="w-[48%] mb-8">
          <Text className="font-bold text-base mb-3 text-white">
            At your Service
          </Text>

          <Text className="text-sm text-gray-300">
            Weekdays
          </Text>
          <Text className="text-sm text-white mb-2">
            Mon – Fri 9 – 18
          </Text>

          <Text className="text-sm text-gray-300">
            Weekend
          </Text>
          <Text className="text-sm text-white">
            Sat 10 – 12
          </Text>
        </View>

        {/* SERVICE & SUPPORT */}
        <View className="w-[48%] mb-8">
          <Text className="font-bold text-base mb-3 text-white">
            Service & Support
          </Text>
          {[
            "Payment",
            "Shipping",
            "Return & Cancellation",
            "Instructions on withdrawal",
            "Size conversion chart",
            "All reviews",
            "FAQ",
            "Battery Disposal",
            "Contact",
          ].map((item) => (
            <Text
              key={item}
              className="text-sm text-gray-300 mb-1"
            >
              {item}
            </Text>
          ))}
        </View>

        {/* MORE ABOUT */}
        <View className="w-[48%] mb-8">
          <Text className="font-bold text-base mb-3 text-white">
            More about...
          </Text>
          {[
            "About Balcade",
            "All Brands",
            "Jobs and careers",
            "BLOG",
            "TEAM",
            "GIFT VOUCHERS",
          ].map((item) => (
            <Text
              key={item}
              className="text-sm text-gray-300 mb-1"
            >
              {item}
            </Text>
          ))}
        </View>
      </View>

      {/* LEGAL */}
      <View className="border-t border-gray-700 pt-5">
        <View className="flex-row flex-wrap">
          {[
            "Legal Notice",
            "Terms & Conditions",
            "Privacy Policy",
            "Cookie Policy",
            "Whistleblower Policy",
          ].map((item) => (
            <Text
              key={item}
              className="text-xs text-gray-400 mr-4 mb-2"
            >
              {item}
            </Text>
          ))}
        </View>

        <Text className="text-xs text-gray-500 mt-3">
          © Balcade Kick Co 2025
        </Text>
      </View>
    </View>
  );
}
