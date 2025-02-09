import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import AppBackground from '@/components/AppBackground'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const AddPlace = () => {
  return (
    <AppBackground>
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 50, paddingTop: 20, fontFamily: "VeganStyle", width: "100%", textAlign: "center", fontSize: 40, fontWeight: "bold" }}>Yeni Mekan Ekle</Text>
        <TextInput
          style={{ paddingLeft: 20, width: "80%", height: 70, borderRadius: 20, borderWidth: 2, borderColor: "rgba(0,0,0,0.3)" }}
          placeholder='Adı kontrol et'
        />
        <TouchableOpacity style={{
          marginTop: 50,
          width: 70,
          height: 70,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(62, 177, 209, 0.98)"
        }}>
          <MaterialCommunityIcons name="qrcode-scan" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{
          marginTop: 50,
          width: 140,
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(28, 206, 70, 0.98)"
        }}>
          <Text style={{ fontSize: 16, color: "white" }}>Ekle</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </AppBackground>
  )
}

export default AddPlace