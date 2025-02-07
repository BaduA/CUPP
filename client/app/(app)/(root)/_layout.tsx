import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TabButton } from '@/components/root/tabbutton';

const Layout = () => {
    return (
        <Tabs>

            <TabSlot />

            <TabList style={{
                height: 75,
                padding: 20,
                alignItems: "center",
                borderRadius: 50,
                marginHorizontal: 10,
                marginBottom: 20,
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 30
            }} asChild>
                <LinearGradient
                    colors={['rgba(217, 217, 217, 0.8)', 'hsla(116, 100.00%, 56.10%, 0.80)']}

                >
                    <TabTrigger name="index" href="/(app)/(root)" asChild>
                        <TabButton iconName={"home"} /></TabTrigger>
                    <TabTrigger name="contributionToNature" href="/(app)/(root)/contributionToNature"
                        asChild>
                        <TabButton iconName={"leaf"} />
                    </TabTrigger>

                    <TabTrigger name="MyQR" href="/(app)/(root)/MyQR" asChild>
                        <TabButton iconName="qrcode" isMiddle={true}>

                        </TabButton>
                    </TabTrigger>
                    <TabTrigger name="profile" href="/(app)/(root)/profile" asChild>
                        <TabButton iconName={"user-alt"} />
                    </TabTrigger>
                    <TabTrigger name="settings" href="/(app)/(root)/settings" asChild>
                        <TabButton iconName={"cog"} />
                    </TabTrigger>
                </LinearGradient>
            </TabList>
        </Tabs >
    )
}

export default Layout