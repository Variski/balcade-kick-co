import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter(); // untuk navigasi ke register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center p-8 bg-black">
      <Text className="text-white text-5xl font-bold mb-5 ">Login</Text>

      <Text className="text-white mt-1 mb-4 text-xl">
        Welcome to <Text className="text-red-600">Balcade</Text> Kicks Co
      </Text>

      <TextInput
        placeholder="Email"
        className="border rounded-2xl p-3 mb-3 bg-white"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border rounded-2xl p-3 mb-6 bg-white"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-red-600 rounded-2xl p-3 mb-4"
        onPress={() => login(email, password)}
      >
        <Text className="text-black text-center font-semibold text-xl">Login</Text>
      </TouchableOpacity>

      {/* Navigasi ke Register */}
      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text className="text-white text-center text-lg">
          Dont have an account? <Text className="text-blue-600 font-bold">Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
