import { View, Text } from 'react-native'
import React from 'react'
import { useSession } from '@/api/auth/ctx'

const Home = () => {
  var {signOut} = useSession()
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home