import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { TabButton } from '@/components/root/tabbutton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Redirect } from 'expo-router';

const Layout = () => {
    const authState = useSelector((state: RootState) => state.auth)

    if (authState.user.role !== "APP_ADMIN")
        return <Redirect href={"/(app)/(owner)/(dashboard)"} />
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
                paddingHorizontal: 30,
                overflow: "visible"
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