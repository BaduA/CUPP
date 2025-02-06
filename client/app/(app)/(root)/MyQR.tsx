import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import QRCode from 'react-native-qrcode-svg';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MyQR = () => {
  const authState = useSelector((state: RootState) => state.auth)

  return (
    <LinearGradient
      colors={['rgb(77, 180, 73)', 'rgb(194, 255, 199)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1, padding: 30 }}
    >
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 50 }}>
          <View style={{ width: 50, height: 50, backgroundColor: "black", borderRadius: 100, marginRight: 20 }}></View>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "white" }}>{authState.user.username}</Text>
        </View>
        <View style={{ marginBottom: 50 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 24 }}>Toplam Puanın</Text>
            <TouchableOpacity>
              <MaterialCommunityIcons name="file-document-multiple" size={32} color="#47663B" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 50, fontWeight: "bold", color: "#27667B" }}>{authState.user.totalPoints}</Text>
            <TouchableOpacity style={{ padding: 10, backgroundColor: "#526E48", borderRadius: 100 }}><Text style={{ color: "rgba(254, 254, 254, 0.81)" }}>Promosyonları Gör</Text></TouchableOpacity>
          </View>
        </View>
        <View style={{
          alignItems: "center",
          justifyContent: "center",
        }}>
          <QRCode
            value={authState.user.id}
            backgroundColor='transparent'
            size={300}
          />
        </View>
        <Text style={{ marginTop: 50, fontWeight: "500", textAlign: "center", fontSize: 20 }}>Puanlarını kullanmak veya puan kazanmak için okut!</Text>
      </View>

    </LinearGradient>)
}

export default MyQR