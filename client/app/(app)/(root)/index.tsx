import { View, Text, Pressable, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur'
import Loading from '@/components/Loading'

const Home = () => {
  const [search, setSearch] = useState("")
  const [imageLoad, setImageLoad] = useState(false)
  const dispatch = useDispatch()
  console.log("xx")
  const readList = [{ name: "Makale 1", image: require("../../../assets/images/4.png") }, { name: "Makale 1", image: require("../../../assets/images/4.png") }]
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={require("../../../assets/ecopmowallpaper.png")} onLoad={() => { setImageLoad(true) }}>
        <View style={{ marginBottom: 20, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <FontAwesome5 name="leaf" size={40} color="rgb(0, 69, 26)" />
          <Text style={{ marginLeft: 20, fontSize: 40, fontWeight: "bold", color: "rgb(0, 69, 26)" }}>Ecopmo</Text>
        </View>
      </ImageBackground>
      <View style={{
        backgroundColor: "rgba(210, 210, 210, 0.95)",
        borderRadius: 20,
        flex: 1,
        width: "100%",
        aspectRatio: 1 / 1.3,
        position: "absolute",
        bottom: 0
      }}>
        <ScrollView style={{ padding: 20 }}>
          <View>
            <View style={{
              width: "100%",
              height: 40,
              backgroundColor: "rgba(144, 144, 144, 0.4)",
              borderRadius: 50,
              alignItems: "center",
              flexDirection: "row",
              paddingLeft: 20,
              marginBottom: 20
            }}>
              <FontAwesome name="search" size={18} color="rgba(110, 110, 110, 0.83)" />
              <TextInput style={{ width: "100%", marginLeft: 10 }} placeholder='Search for places...' />

            </View>
          </View>
          <View>
            <Text style={{ marginBottom: 10, fontSize: 22, fontWeight: "600" }}>Oku</Text>
            <ScrollView horizontal>
              {readList.map((element, index) =>
                <TouchableOpacity style={{ marginRight: 10 }} key={index}>
                  <ImageBackground
                    source={element.image}
                    style={{ width: 300, height: 180, borderRadius: 20, overflow: "hidden" }}>
                    <LinearGradient colors={["rgba(5, 5, 5, 0)", "rgb(0, 27, 3)"]} style={{ marginTop: "auto", width: "100%", height: "30%" }}>

                    </LinearGradient>


                  </ImageBackground>
                </TouchableOpacity>)}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <Loading isShown={!imageLoad} intensity={200}/>
    </View>
  )
}

export default Home
