import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const DashboardLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false, animation: "fade", headerTitle: "Dashboard" }} />
            <Stack.Screen name='addPlace' options={{ headerShown: false, headerBackTitleStyle: {}, animation: "fade", headerTitle: "Add Place", headerStyle: { backgroundColor: "rgba(0, 99, 73, 0.72)" } }} />
            <Stack.Screen name='deletePlace' options={{ headerShown: false, headerBackTitleStyle: {}, animation: "fade", headerTitle: "Add Place", headerStyle: { backgroundColor: "rgba(0, 99, 73, 0.72)" } }} />
            <Stack.Screen name='readQR' options={{
                presentation:"transparentModal",
                headerShown: false, 
                animation:"fade"
            }} />
        </Stack>
    )
}

export default DashboardLayout