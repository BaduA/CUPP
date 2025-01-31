import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Brand from '@/components/auth/brand'
import { ImageBackground } from 'expo-image'
import { Link, router } from 'expo-router'
import { useSession } from '@/api/auth/ctx'
import { useSearchParams } from 'expo-router/build/hooks'

const SignInPassword = () => {
    const { signIn } = useSession()
    const params = useSearchParams()
    const [password, setPassword] = useState<string>()
    const [passwordValid, setPasswordValid] = useState<boolean>(false)
    const [warningMessageDisplay, setDisplay] = useState<"none" | "flex" | undefined>("none")
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
    var onPress = () => {
        if (!passwordValid) {
            setDisplay("flex")
        } else {
            
        }
    }
    return (
        <ImageBackground
            source={require("../../assets/images/1.png")}
            resizeMode="cover"
            style={{ flex: 1, backgroundColor: "red" }}
            blurRadius={50}>
            <Brand></Brand>

            <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
                <Text style={{ color: "white", fontSize: 35, fontWeight: "700", marginBottom: 30 }}>Şifrenizi Girin</Text>
                <View>
                    <Text style={{ color: "white", fontSize: 16, marginBottom: 16 }}>Şifreniz</Text>
                    <TextInput
                        style={{ color: "white", width: "100%", height: 50, backgroundColor: "rgba(40, 40, 40, 0.3)", borderRadius: 10, paddingLeft: 20, fontSize: 18 }}
                        placeholder='*********'
                        onChangeText={(text) => validate(text)}
                        value={password}
                        secureTextEntry={true}
                    />
                    <Text style={{ marginTop: 5, color: "rgb(255, 109, 109)", fontWeight: "bold", display: warningMessageDisplay }}>En az 8 harften oluşan ve harf ile sayı içeren bir şifre oluşturun.</Text>
                    <TouchableOpacity onPress={onPress} style={{ marginTop: 20, width: "100%", height: 50, backgroundColor: "rgba(59, 59, 59, 0.37)", borderRadius: 10, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "white", fontSize: 18, }}>Giriş Yap</Text></TouchableOpacity>
                    <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <Link href="/" style={{ color: "white" }}>Yardıma mı ihtiyacınız var?</Link>
                        <Link href="/" style={{ color: "white" }}>Hesap Oluştur </Link>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default SignInPassword