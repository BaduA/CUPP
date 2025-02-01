import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import Brand from '@/components/auth/brand'
import { ImageBackground } from 'expo-image'
import * as AppleAuthentication from 'expo-apple-authentication';
import TextInputDark from '@/components/TextInputDark';
import MailTextInput from '@/components/MailTextInput';
import PasswordTextInput from '@/components/PasswordTextInput';

const SignUp = () => {
    const blurhash = "L4HK2sOa00-O00IpK6Xn16%1};Mx"
    var [name, setName] = useState<string>("")
    var [lastname, setLastname] = useState<string>("")
    var [username, setUsername] = useState<string>("")
    var [phoneNumber, setPhoneNumber] = useState<string>("")
    const [email, setEmail] = useState<string>()
    const [emailValid, setEmailValid] = useState<boolean>(false)
    const [password, setPassword] = useState<string>()
    const [passwordValid, setPasswordValid] = useState<boolean>(false)
    return (
        <ImageBackground
            source={require("../../assets/images/1.png")}
            resizeMode="cover"
            style={{ flex: 1 }}
            blurRadius={50}
            placeholder={{ blurhash }}
        >
            <Brand />
            <KeyboardAvoidingView style={styles.containerSignup} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text style={styles.whiteHeaderDescription}>Welcome to</Text>
                <Text style={styles.whiteHeader}>ecopmo!</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                    <TextInputDark value={name} setValue={setName} width={"48%"} placeholder='İsminizi girin' label={"İsminiz"} />
                    <TextInputDark value={lastname} setValue={setLastname} width={"48%"} placeholder='Soyisminizi girin' label={"Soyisminiz"} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                    <MailTextInput email={email!} setEmail={setEmail} emailValid={emailValid!} setEmailValid={setEmailValid} placeholder='ornek@email.com' label='Mail Adresinizi girin' />
                </View>
                <View style={{marginBottom:20}}>
                    <Text style={{ color: "white", fontSize: 16, marginBottom: 16 }}>Şifre</Text>
                    <PasswordTextInput password={password!} setPassword={setPassword} passwordValid={passwordValid!} setPasswordValid={setPasswordValid} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                    <TextInputDark value={username} setValue={setUsername} width={"48%"} placeholder='İsminizi girin' label={"İsminiz"} />
                    <TextInputDark value={phoneNumber} setValue={setPhoneNumber} width={"48%"} placeholder='Soyisminizi girin' label={"Soyisminiz"} type='numeric'/>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

export default SignUp

const styles = StyleSheet.create({
    containerSignup: {
        flex: 1,
        padding: 20,
    },
    whiteHeader: {
        fontSize: 60,
        fontWeight: "bold",
        color: "white",
        marginBottom: 30
    },
    whiteHeaderDescription: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        height: 44,
    },
})