import { View, Text } from 'react-native'
import React from 'react'
import { ImageBackground } from 'expo-image'
import Brand from '@/components/auth/brand'

const ConfirmAccount = () => {
  const blurhash = "L4HK2sOa00-O00IpK6Xn16%1};Mx"
  return (
    <ImageBackground
      source={require("../../assets/images/1.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
      blurRadius={50}
      placeholder={{ blurhash }}
    >

      <Brand></Brand>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontSize:40, color:"white", fontWeight:"600"}}>Hesabını Doğrula!</Text>
      </View>
    </ImageBackground>
  )
}

export default ConfirmAccount