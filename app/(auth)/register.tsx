import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { registerApi } from "../services/authServices";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      const res = await registerApi(name, email, password);

      if (res.status) {
        alert("Register berhasil, silakan login");
        router.replace("/(auth)/login");
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server");
    }
  };

  return (
    <View className="flex-1 justify-center p-8 bg-black">
      <Text className="text-white text-5xl font-bold mb-5">Register</Text>

      <Text className="text-white mt-1 mb-4 text-lg">
        Create your account for{" "}
        <Text className="text-red-600">Balcade</Text> Kicks Co
      </Text>

      <TextInput
        placeholder="Nama"
        className="border rounded-2xl p-3 mb-3 bg-white"
        value={name}
        onChangeText={setName}
      />

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
        onPress={handleRegister}
      >
        <Text className="text-black text-center font-semibold text-xl">
          Register
        </Text>
      </TouchableOpacity>

      {/* Navigasi ke Login */}
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text className="text-white text-center text-lg">
          Already have an account?{" "}
          <Text className="text-red-600 font-bold">Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
