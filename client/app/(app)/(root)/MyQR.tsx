import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import QRCode from 'react-native-qrcode-svg';

const MyQR = () => {
  const authState = useSelector((state: RootState) => state.auth)

  return (
    <LinearGradient
      colors={['rgba(2, 199, 22, 0.8)', 'rgba(0, 80, 8, 0.8)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1, padding: 30 }}
    >
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 50 }}>
          <View style={{ width: 50, height: 50, backgroundColor: "black", borderRadius: 100, marginRight: 20 }}></View>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "white" }}>{authState.user.username}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 50 }}>
          <Text style={{ fontSize: 50, fontWeight: "bold", color: "#27667B" }}>{authState.user.totalPoints}</Text>
          <Text style={{ color: "white", fontSize: 30, marginLeft: 30 }}>Toplam Puanın</Text>
        </View>
        <QRCode
          value={authState.user.id}
        />
      </View>

    </LinearGradient>)
}

export default MyQR