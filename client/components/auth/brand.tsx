import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';

const Brand = () => {
    return (
        <View style={{ width: "100%", height: 100, backgroundColor: "#E9DFC4", justifyContent: "center", alignItems: "center", paddingTop: 45, borderRadius: 20, overflow:"hidden" }}>
            <StatusBar barStyle={"dark-content"}></StatusBar>
            <Image source={require("../../assets/images/brand.png")} contentFit="cover" style={{ backgroundColor: "#E9DFC4", flex: 1, width: "100%" }}></Image>
        </View>
    )
}

export default Brand