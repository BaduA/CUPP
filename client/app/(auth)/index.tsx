import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import Brand from '@/components/auth/brand'
import { ImageBackground } from 'expo-image'
import { Link, router } from 'expo-router'

const AuthIndex = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/1.png")}
      resizeMode="cover"
      style={{ flex: 1, backgroundColor: "red" }}
      blurRadius={50}>
      <Brand></Brand>

      <View style={{ paddingHorizontal: 20, paddingVertical: 30, flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 35, fontWeight: "bold" }}>Çevreni Koru,</Text>
        <Text style={{ color: "white", fontSize: 35, fontWeight: "bold", textAlign: "center" }}>Kazanarak Kahveni İç!</Text>
        <TouchableOpacity activeOpacity={0.5} style={{ width: "80%", height: 50, backgroundColor: "#008D8C", borderRadius: 10, justifyContent: "center", alignItems: "center", marginVertical: 10 }}><Text style={{ color: "white", fontSize: 16 }}>Hesap Oluştur</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          router.push("/(auth)/sign-in-email")
        }} activeOpacity={0.5} style={{ width: "80%", height: 50, backgroundColor: "#E9DFC4", borderRadius: 10, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "black", fontSize: 16 }}>Hesabım Var</Text></TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default AuthIndex