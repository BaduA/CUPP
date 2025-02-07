import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const OwnerLayout = () => {
    const authState = useSelector((state: RootState) => state.auth)
    if(authState.user.role!=="APP_ADMIN")
        return <Redirect href={"/(app)/(root)"}/>
  return (
    <Stack></Stack>
  )
}

export default OwnerLayout