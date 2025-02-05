import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const Layout = () => {
    return (
        <Tabs>
            <TabSlot/>
            <TabList style={{
                height: 75,
                padding: 20,
                alignItems: "center",
                borderRadius: 50,
                marginHorizontal: 10,
                marginBottom: 20,
                backgroundColor:"transparent"
            }} asChild>
                <LinearGradient
                    colors={['rgba(217, 217, 217, 0.8)', 'hsla(116, 100.00%, 56.10%, 0.80)']}
                >
                    <TabTrigger name="index" href="/(app)/(root)">
                        <FontAwesome5 name="home" size={28} color="rgb(255,255,255)" /></TabTrigger>
                    <TabTrigger name="article" href="/(app)/(root)/contributionToNature">
                        <FontAwesome5 name="leaf" size={28} color="rgb(255,255,255)" /></TabTrigger>
                    <TabTrigger name="article" href="/(app)/(root)/MyQR">
                        <View style={{ width: 90, height: 90, backgroundColor: "rgb(2, 228, 28)", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                            <MaterialCommunityIcons name="qrcode-scan" size={28} color="rgb(255,255,255)" />
                        </View>
                    </TabTrigger>
                    <TabTrigger name="article" href="/(app)/(root)/profile">
                        <FontAwesome name="user-circle" size={28} color="rgb(255,255,255)" /></TabTrigger>
                    <TabTrigger name="article" href="/(app)/(root)/settings">
                        <Ionicons name="settings" size={28} color="rgb(255, 255, 255)" /></TabTrigger>
                </LinearGradient>
            </TabList>
        </Tabs>
    )
}

export default Layout