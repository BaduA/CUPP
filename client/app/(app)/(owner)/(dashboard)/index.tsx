import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import AppBackground from '@/components/AppBackground'
import { getTotalPointsDaily } from '@/api/owner/owner_calls'
import { BlurView } from 'expo-blur'
import { Link, router } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';

const OwnerIndex = () => {
  const query = getTotalPointsDaily()
  if (query.isLoading) return <BlurView style={{ flex: 1 }} intensity={100} />
  return (
    <AppBackground>
      <Text style={{ paddingTop: 20, fontFamily: "VeganStyle", position: "absolute", top: 100, width: "100%", textAlign: "center", fontSize: 40, fontWeight: "bold" }}>Ecopmo Dashboard</Text>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 50 }}>

        <View style={{ alignItems: "center", marginBottom: 50 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bugünün Kullanıcı Kazancı</Text>
          <Text style={{ fontSize: 70, fontWeight: "bold" }}>{query.data!.data}</Text>
          <Link style={{ color: "rgb(0, 123, 255)" }} href={"/(app)/(owner)/(dashboard)"}>Detayları Gör</Link>
        </View>
        <View style={{ alignItems: "center", marginBottom: 50 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Kayıtlı Mekan</Text>
          <Text style={{ fontSize: 70, fontWeight: "bold" }}>{query.data!.data}</Text>
          <Link style={{ color: "rgb(0, 123, 255)" }} href={"/(app)/(owner)/(dashboard)"}>Detayları Gör</Link>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
          <TouchableOpacity onPress={() => {
            router.push("/(app)/(owner)/(dashboard)/addPlace")
          }} style={{ justifyContent: "center", alignItems: "center", borderRadius: 100, width: 80, height: 80, backgroundColor: "rgba(0, 200, 255, 0.62)", marginBottom: 50 }}>
            <Entypo name="plus" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/(app)/(owner)/(dashboard)/deletePlace")
            }}
            style={{ justifyContent: "center", alignItems: "center", borderRadius: 100, width: 80, height: 80, backgroundColor: "rgba(200, 2, 2, 0.69)" }}>
            <Entypo name="minus" size={32} color="black" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </AppBackground>
  )
}

export default OwnerIndex