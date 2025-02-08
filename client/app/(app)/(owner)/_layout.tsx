import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui'
import { LinearGradient } from 'expo-linear-gradient'
import { TabButton } from '@/components/root/tabbutton'
import Ionicons from '@expo/vector-icons/Ionicons';

const OwnerLayout = () => {
    const authState = useSelector((state: RootState) => state.auth)
    if (authState.user.role !== "APP_ADMIN")
        return <Redirect href={"/(app)/(root)"} />
    return (
        <Tabs>

            <TabSlot />

            <TabList style={{
                height: 75,
                padding: 20,
                alignItems: "center",
                borderRadius: 20,
                marginHorizontal: 10,
                marginBottom: 20,
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 30,
                overflow: "visible"
            }} asChild>
                <LinearGradient
                    colors={['rgba(41, 255, 69, 0.8)', 'rgba(1, 190, 140, 0.8)']}

                >
                    <TabTrigger name="(dashboard)" href="/(app)/(owner)/(dashboard)" asChild>
                        <TabButton iconName={"home"} /></TabTrigger>
                    <TabTrigger name="admins" href="/(app)/(owner)/admins"
                        asChild>
                        <TabButton iconName={"leaf"} />
                    </TabTrigger>
                    <TabTrigger name="settings" href="/(app)/(owner)/settings"
                        asChild>
                        <TabButton iconName={"cog"} />
                    </TabTrigger>


                </LinearGradient>
            </TabList>
        </Tabs >
    )
}

export default OwnerLayout