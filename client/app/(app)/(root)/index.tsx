import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useSession } from '@/api/auth/ctx'
import { router } from 'expo-router'

const Home = () => {
  var {signOut} = useSession()
  return (
    <View>
      <Text>Home</Text>
      <Pressable style={{width:"30%", height:50, backgroundColor:"red"}}><Text>SignOut</Text></Pressable>
      <Pressable  style={{width:"30%", height:50, backgroundColor:"red"}} onPress={()=>{
        router.push("/(app)/(root)/contributionToNature")
      }}><Text>To Contribution to nature</Text></Pressable>
    </View>
  )
}

export default Home