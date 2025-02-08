import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const AppBackground = ({ children }: { children: any }) => {
    return (
        <LinearGradient colors={["rgb(0, 93, 0)", "rgba(0, 144, 106, 0.72)"]}
            start={[0, 1]}
            end={[1, 0]}
            style={{ flex: 1 }}>
            <View
                style={{ position: "absolute", transform: [{ rotate: "-30deg" }], right: 0, left: 0, top: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}
            >
                <FontAwesome5
                    name="leaf"
                    size={300} color="rgba(0,0,0,0.1)" /></View>

            {children}
        </LinearGradient>)
}

export default AppBackground