import { View, Text, Pressable, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'


const NonSearchingList = () => {
    const readList = [{ name: "Makale 1", image: require("../../../assets/images/4.png") }, { name: "Makale 1", image: require("../../../assets/images/4.png") }]

    return (
        <ScrollView >
            <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 10, fontSize: 22, fontWeight: "600" }}>Promosyonlar</Text>
                <ScrollView horizontal>
                    {readList.map((element, index) =>
                        <TouchableOpacity style={{ marginRight: 10 }} key={index}>
                            <ImageBackground
                                source={element.image}
                                style={{ width: 300, height: 180, borderRadius: 20, overflow: "hidden" }}>
                                <LinearGradient colors={["rgba(5, 5, 5, 0)", "rgb(0, 27, 3)"]} style={{ marginTop: "auto", width: "100%", height: "30%" }}>

                                </LinearGradient>


                            </ImageBackground>
                        </TouchableOpacity>)}
                </ScrollView>
            </View>
            <View>
                <Text style={{ marginBottom: 10, fontSize: 22, fontWeight: "600" }}>Oku</Text>
                <ScrollView horizontal>
                    {readList.map((element, index) =>
                        <TouchableOpacity style={{ marginRight: 10 }} key={index}>
                            <ImageBackground
                                source={element.image}
                                style={{ width: 300, height: 180, borderRadius: 20, overflow: "hidden" }}>
                                <LinearGradient colors={["rgba(5, 5, 5, 0)", "rgb(0, 27, 3)"]} style={{ marginTop: "auto", width: "100%", height: "30%" }}>

                                </LinearGradient>


                            </ImageBackground>
                        </TouchableOpacity>)}
                </ScrollView>
            </View>

        </ScrollView>
    )
}

export default NonSearchingList