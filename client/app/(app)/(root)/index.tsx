import { View, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ImageBackground } from 'expo-image'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Loading from '@/components/Loading'
import NonSearchingList from '@/components/root/index/nonSearchingList'
import SearchingList from '@/components/root/index/searchingList';

const Home = () => {
  const [search, setSearch] = useState("")
  const [imageLoad, setImageLoad] = useState(false)
  const dispatch = useDispatch()

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={require("../../../assets/ecopmowallpaper.png")} onLoad={() => { setImageLoad(true) }}>
        <View style={{ marginBottom: 20, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <FontAwesome5 name="leaf" size={40} color="rgb(0, 69, 26)" />
          <Text style={{ marginLeft: 20, fontSize: 40, fontWeight: "bold", color: "rgb(0, 69, 26)" }}>Ecopmo</Text>
        </View>
      </ImageBackground>
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? "padding" : 'height'}
        style={{
          backgroundColor: "rgba(210, 210, 210, 0.95)",
          borderRadius: 20,
          flex: 1,
          width: "100%",
          aspectRatio: 1 / 1.3,
          position: "absolute",
          bottom: 0,
          padding: 20
        }}>
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
            <TextInput onChangeText={(txt)=>{setSearch(txt)}} style={{ width: "100%", marginLeft: 10 }} placeholder='Search for places...' />
          </View>
        </View>
        {search!==""?<SearchingList/>:<NonSearchingList/>}
      </KeyboardAvoidingView>
      <Loading isShown={!imageLoad} intensity={200} />
    </View >
  )
}

export default Home
