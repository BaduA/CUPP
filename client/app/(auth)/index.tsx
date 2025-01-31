import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Brand from '@/components/auth/brand'

const AuthIndex = () => {
  return (
    <View>
      <Brand></Brand>
      <Text>SIGN IN</Text>
    </View>
  )
}

export default AuthIndex