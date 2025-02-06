import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Home = () => {
  const dispatch = useDispatch()
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <FontAwesome5 name="leaf" size={40} color="rgb(0, 69, 26)" />
        <Text style={{ marginLeft: 20, fontSize: 40, fontWeight: "bold", color: "rgb(0, 69, 26)" }}>Ecopmo</Text>
      </View>
      <Pressable style={{ width: "30%", height: 50, backgroundColor: "red" }} onPress={() => {
        dispatch(logout())
      }}><Text>SignOut</Text></Pressable>
      <Pressable style={{ width: "30%", height: 50, backgroundColor: "red" }} onPress={() => {
        router.push("/(app)/(root)/contributionToNature")
      }}><Text>To Contribution to nature</Text></Pressable>
    </View>
  )
}

export default Home