import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Brand from '@/components/auth/brand'
import { ImageBackground } from 'expo-image'
import { Link, router } from 'expo-router'

const SignInEmail = () => {
  const [email, setEmail] = useState<string>()
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [warningMessageDisplay, setDisplay] = useState<"none" | "flex" | undefined>("none")
  var validate = (text: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmail(text)
      if (emailValid)
        setEmailValid(false)
    }
    else {
      setEmail(text)
      if (!emailValid)
        setEmailValid(true)
    }
  }
  var onPress = () => {
    if (!emailValid) {
      setDisplay("flex")
    } else {
      router.push({ pathname: "/(auth)/sign-in-password", params: { email: email } })
    }
  }
  return (
    <ImageBackground
      source={require("../../assets/images/1.png")}
      resizeMode="cover"
      style={{ flex: 1, backgroundColor: "red" }}
      blurRadius={50}>
      <Brand></Brand>

      <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
        <Text style={{ color: "white", fontSize: 35, fontWeight: "700", marginBottom: 30 }}>Bir hesap oluşturun veya giriş yapın</Text>
        <View>
          <Text style={{ color: "white", fontSize: 16, marginBottom: 16 }}>E-posta ile giriş yapın</Text>
          <TextInput
            style={{ color: "white", width: "100%", height: 50, backgroundColor: "rgba(40, 40, 40, 0.3)", borderRadius: 10, paddingLeft: 20, fontSize: 18 }}
            placeholder='ornek@gmail.com'
            onChangeText={(text) => validate(text)}
            value={email}
          />
          <Text style={{ marginTop: 5, color: "rgb(255, 109, 109)", fontWeight: "bold", display: warningMessageDisplay }}>Geçerli bir mail adresi girin.</Text>
          <TouchableOpacity onPress={onPress} style={{ marginTop: 20, width: "100%", height: 50, backgroundColor: "rgba(59, 59, 59, 0.37)", borderRadius: 10, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "white", fontSize: 18, }}>Devam Et</Text></TouchableOpacity>
          <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
            <Link href="/" style={{ color: "white" }}>Yardıma mı ihtiyacınız var?</Link>
            <Link href="/" style={{ color: "white" }}>Hesap Oluştur </Link>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default SignInEmail