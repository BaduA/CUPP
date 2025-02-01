import { View, Text, TextInput, StyleSheet, StyleProp, ViewStyle, DimensionValue, KeyboardTypeOptions } from 'react-native'
import React, { ReactNode } from 'react'

const TextInputDark = ({ label, placeholder, value, setValue, width, type }: { label: ReactNode, placeholder: string, value: string, setValue: any, width: DimensionValue, type?:KeyboardTypeOptions }) => {
    return (
        <View style={{ width: width }}>
            <Text style={{color:"rgba(255,255,255,0.5)", marginBottom:10}}>{label}</Text>
            <TextInput
                style={{ paddingLeft:20,fontSize:18,width: "100%", height: 60, borderRadius: 10, backgroundColor: "rgba(0, 0, 0, 0.21)" }}
                value={value}
                onChangeText={(val) => { setValue(val) }}
                placeholder={placeholder}
                keyboardType={type}
            ></TextInput>
        </View>
    )
}

export default TextInputDark