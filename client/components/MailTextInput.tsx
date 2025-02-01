import { View, Text, TextInput } from 'react-native'
import React from 'react'

const MailTextInput = ({ email, setEmail, emailValid, setEmailValid, placeholder, label }: { email: string, setEmail: any, emailValid: boolean, setEmailValid: any, placeholder: string, label: string }) => {
    var validate = (text: string) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setEmail(text)
            if (emailValid)
                setEmailValid(false)
        }
        else {
            setEmail(text)
            if (!emailValid)
                setEmailValid(true)
        }
    }
    return (
        <View style={{width:"100%"}}>
            <Text style={{ color: "white", fontSize: 16, marginBottom: 16 }}>{label}</Text>
            <TextInput
                style={{ color: "white", width: "100%", height: 50, backgroundColor: "rgba(40, 40, 40, 0.3)", borderRadius: 10, paddingLeft: 20, fontSize: 18 }}
                placeholder={placeholder}
                onChangeText={(text) => validate(text)}
                value={email}
                keyboardType="email-address"
            /></View>

    )
}

export default MailTextInput