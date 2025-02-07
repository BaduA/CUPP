import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import { ImageBackground } from 'expo-image'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Settings = () => {
  const dispatch = useDispatch()
  const settingsList = [{
    name: "Çıkış Yap",
    action: () => {
      Alert.alert("Çıkış Yap",
        "Çıkış yapmak istediğine emin misin?"
        ,
        [{ text: "Evet", onPress: () => { dispatch(logout()) } },
        { text: "Hayır", style: "cancel" }
        ])
    }
  }]
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../../assets/settingswallpaper.png")}>
      <View style={{
        paddingTop: 50,
        backgroundColor: "rgba(0,0,0,0.5)", flex: 1
      }}>
        <Text style={{ marginBottom: 60, color: "white", marginLeft: 50, fontSize: 38, fontWeight: "bold" }}>Ayarlar</Text>
        {settingsList.map(s => {
          return <Pressable style={{
            width: "100%", height: 50,
            borderWidth: 1,
            borderTopColor: "white",
            borderBottomColor: "white",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20
          }}
          onPress={()=>{s.action()}}>
            <MaterialIcons name="logout" size={26} color="white" style={{ marginRight: 20 }} />
            <Text style={{ color: "white", fontSize: 20 }}>{s.name}</Text>
          </Pressable>
        })}
      </View>
    </ImageBackground>
  )
}

export default Settings