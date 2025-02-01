import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Brand from '@/components/auth/brand'
import { ImageBackground } from 'expo-image'
import { Link, router } from 'expo-router'
import MailTextInput from '@/components/MailTextInput'

const SignInEmail = () => {
  const [email, setEmail] = useState<string>()
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [warningMessageDisplay, setDisplay] = useState<"none" | "flex" | undefined>("none")
  const blurhash = "L4HK2sOa00-O00IpK6Xn16%1};Mx"
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
      style={{ flex: 1 }}
      blurRadius={50}
      placeholder={{ blurhash }}
    >

      <Brand></Brand>

      <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
        <Text style={{ color: "white", fontSize: 35, fontWeight: "700", marginBottom: 30 }}>Bir hesap oluşturun veya giriş yapın</Text>
        <View>
          <MailTextInput email={email!} setEmail={setEmail} emailValid={emailValid!} setEmailValid={setEmailValid} placeholder='ornek@email.com' label='Mail Adresinizi girin'/>
          <Text style={{ marginTop: 5, color: "rgb(255, 109, 109)", fontWeight: "bold", display: warningMessageDisplay }}>Geçerli bir mail adresi girin.</Text>
          <TouchableOpacity onPress={onPress} style={{ marginTop: 20, width: "100%", height: 50, backgroundColor: "rgba(59, 59, 59, 0.37)", borderRadius: 10, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "white", fontSize: 18, }}>Devam Et</Text></TouchableOpacity>
          <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
            <Link href="/" style={{ color: "white" }}>Yardıma mı ihtiyacınız var?</Link>
            <Link href="/(auth)/sign-up" style={{ color: "white" }}>Hesap Oluştur </Link>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default SignInEmail