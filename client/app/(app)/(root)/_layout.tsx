import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name='contributionToNature' options={{}}></Stack.Screen>
        </Stack>
    )
}

export default Layout