import { View, Text, TextInput } from 'react-native'
import React from 'react'

const PasswordTextInput = ({ password, setPassword, passwordValid, setPasswordValid }: { password: string, setPassword: any, passwordValid: boolean, setPasswordValid: any }) => {
    var validate = (text: string) => {
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (reg.test(text) === false) {
            setPassword(text)
            if (passwordValid)
                setPasswordValid(false)
        }
        else {
            setPassword(text)
            if (!passwordValid)
                setPasswordValid(true)
        }
    }

    return (
        <TextInput
            style={{ color: "white", width: "100%", height: 50, backgroundColor: "rgba(40, 40, 40, 0.3)", borderRadius: 10, paddingLeft: 20, fontSize: 18 }}
            placeholder='*********'
            onChangeText={(text) => validate(text)}
            value={password}
            secureTextEntry={true}
        />
    )
}

export default PasswordTextInput