import { View, Text, StatusBar, Platform } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';

const Brand = () => {
    return (
        <View style={{ width: "100%", height:Platform.OS == "ios" ? 100:70, backgroundColor: "#E9DFC4", justifyContent: "center", alignItems: "center", paddingTop: Platform.OS == "ios" ? 45:0, borderRadius: 20,borderTopLeftRadius:0,borderTopRightRadius:0, overflow:"hidden" }}>
            <StatusBar barStyle={"dark-content"}></StatusBar>
            <Image source={require("../../assets/images/brand.png")} contentFit="cover" style={{ backgroundColor: "#E9DFC4", flex: 1, width: "100%" }}></Image>
        </View>
    )
}

export default Brand