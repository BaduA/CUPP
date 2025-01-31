import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown:false
            }}/>
            <Stack.Screen name="sign-in-email" options={{
                headerShown:false
            }}/>
            <Stack.Screen name="sign-in-password" options={{
                headerShown:false
            }}/>
        </Stack>
    )
}

export default Layout