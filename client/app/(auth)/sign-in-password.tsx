import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Brand from '@/components/auth/brand'
import { ImageBackground } from 'expo-image'
import { Link, Redirect, router } from 'expo-router'
import { useSession } from '@/api/auth/ctx'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import { signIn } from '@/api/auth/auth_calls'
import Loading from '@/components/Loading'
import { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'

const SignInPassword = () => {
    const { signInSession, session } = useSession()
    const { isPending, isSuccess, isError, data, error, mutate } = signIn()
    const { email } = useLocalSearchParams()
    const [password, setPassword] = useState<string>()
    const [passwordValid, setPasswordValid] = useState<boolean>(false)
    const [warningMessageDisplay, setDisplay] = useState<"none" | "flex" | undefined>("none")
    const dispatch = useDispatch()

    const blurhash = "L4HK2sOa00-O00IpK6Xn16%1};Mx"
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
            mutate({ email, password })
        }
    }
    useEffect(() => {
        if (isSuccess) {
            signInSession(data.data.token)
            router.replace("/(app)/(root)")
        }
    }, [isSuccess, isError])

    return (
        <ImageBackground
            source={require("../../assets/images/1.png")}
            resizeMode="cover"
            style={{ flex: 1, backgroundColor: "red" }}
            blurRadius={50}
            placeholder={{ blurhash }}
        >
            <Brand></Brand>

            <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
                <Text style={{ color: "white", fontSize: 35, fontWeight: "700", marginBottom: 30 }}>Şifrenizi Girin</Text>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "white", fontSize: 16, marginBottom: 16 }}>Şifreniz</Text>
                        <Pressable onPress={() => {
                            router.back()
                        }} ><Text style={{ color: "rgb(0, 22, 224)", fontSize: 18 }}>Go Back</Text></Pressable>
                    </View>
                    <TextInput
                        style={{ color: "white", width: "100%", height: 50, backgroundColor: "rgba(40, 40, 40, 0.3)", borderRadius: 10, paddingLeft: 20, fontSize: 18 }}
                        placeholder='*********'
                        onChangeText={(text) => validate(text)}
                        value={password}
                        secureTextEntry={true}
                    />
                    {error && error instanceof AxiosError && <Text style={{ color: "rgb(255, 0, 0)", marginTop: 5 }}>*{error.response!.data.message}</Text>}
                    <Text style={{ marginTop: 5, color: "rgb(255, 109, 109)", fontWeight: "bold", display: warningMessageDisplay }}>En az 8 harften oluşan ve harf ile sayı içeren bir şifre oluşturun.</Text>
                    <TouchableOpacity onPress={onPress} style={{ marginTop: 20, width: "100%", height: 50, backgroundColor: "rgba(59, 59, 59, 0.37)", borderRadius: 10, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "white", fontSize: 18, }}>Giriş Yap</Text></TouchableOpacity>
                    <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <Link href="/" style={{ color: "white" }}>Yardıma mı ihtiyacınız var?</Link>
                        <Link href="/" style={{ color: "white" }}>Hesap Oluştur </Link>
                    </View>
                </View>
            </View>
            <Loading isShown={isPending}></Loading>
        </ImageBackground>
    )
}

export default SignInPassword