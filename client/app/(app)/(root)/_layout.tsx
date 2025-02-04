import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
const Layout = () => {
    return (
        <Tabs>
            <TabSlot />
            <TabList style={{ backgroundColor: "red" }}>
                <TabTrigger name="index" href="/(app)/(root)">
                    <Text>Home</Text>
                </TabTrigger>
                <TabTrigger name="article" href="/article">
                    <Text>Article</Text>
                </TabTrigger>

            </TabList>
        </Tabs>
    )
}

export default Layout