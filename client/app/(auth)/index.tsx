import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import Brand from '@/components/auth/brand'
import { ImageBackground } from 'expo-image'
import { Link, router } from 'expo-router'
import Loading from '@/components/Loading'
import { useRoute } from '@react-navigation/native'
import * as SecureStore from "expo-secure-store";

const AuthIndex = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const blurhash = "L4HK2sOa00-O00IpK6Xn16%1};Mx"
  var token = SecureStore.getItem("token")
  return (
    <ImageBackground
      source={require("../../assets/images/1.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
      blurRadius={50}
      onLoad={() => { setImageLoaded(true) }}
      placeholder={{ blurhash }}
    >
      <Brand></Brand>

      <View style={{ paddingHorizontal: 20, paddingVertical: 30, flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 35, fontWeight: "bold" }}>Çevreni Koru,</Text>
        <Text style={{ color: "white", fontSize: 35, fontWeight: "bold", textAlign: "center" }}>Kazanarak Kahveni İç!</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/sign-up")
          }}
          activeOpacity={0.5} style={{ width: "80%", height: 50, backgroundColor: "#008D8C", borderRadius: 10, justifyContent: "center", alignItems: "center", marginVertical: 10 }}><Text style={{ color: "white", fontSize: 16 }}>Hesap Oluştur</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
          router.push("/(auth)/sign-in-email")
        }} activeOpacity={0.5} style={{ width: "80%", height: 50, backgroundColor: "#E9DFC4", borderRadius: 10, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "black", fontSize: 16 }}>Hesabım Var</Text></TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default AuthIndex