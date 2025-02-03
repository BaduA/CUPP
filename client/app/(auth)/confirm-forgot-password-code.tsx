import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'expo-image'
import Brand from '@/components/auth/brand'
import { sendForForgotPassword, verifyForgotPasswordCode } from '@/api/auth/auth_calls'
import Loading from '@/components/Loading'
import { AxiosError } from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { router, useLocalSearchParams } from 'expo-router'

const ConfirmForgotPasswordCode = () => {
    const { email } = useLocalSearchParams()
    const blurhash = "L4HK2sOa00-O00IpK6Xn16%1};Mx"
    const [code, setCode] = useState("------")
    const authState = useSelector((state: RootState) => state.auth)
    const [activeInput, setActiveInput] = useState<null | number>(null)

    const sendForgotPasswordCodeFn = sendForForgotPassword()
    const verifyCodeFn = verifyForgotPasswordCode()

    var verifyCode = () => {
        verifyCodeFn.mutate(code)
    }

    useEffect(() => {
        if (verifyCodeFn.isError) {
            setCode("-----")
            Keyboard.dismiss()
        }
        if (verifyCodeFn.isSuccess) {
            router.push("/change-forgot-password")
        }
    }, [verifyCodeFn.isError, verifyCodeFn.isSuccess])
    return (
        <ImageBackground
            source={require("../../assets/images/1.png")}
            resizeMode="cover"
            style={{ flex: 1 }}
            blurRadius={50}
            placeholder={{ blurhash }}
        >
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
                setActiveInput(null)
            }}>
                <View style={{ flex: 1 }}>
                    <Brand></Brand>
                    <KeyboardAvoidingView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 40, color: "white", fontWeight: "600", marginBottom: 5 }}>Şifreni mi unuttun?</Text>
                        <Text style={{ fontSize: 20, color: "white", marginBottom: 20, paddingHorizontal: 20 }}>{email} adresine {sendForgotPasswordCodeFn.isSuccess ? "kod gönderildi" : "kod iste"}</Text>
                        {sendForgotPasswordCodeFn.isSuccess && <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                                {[...Array(6).keys()].map((num) => {
                                    return <TextInput
                                        key={num}
                                        keyboardType='numeric'
                                        maxLength={1}
                                        onPress={() => {
                                            setActiveInput(num)
                                        }}
                                        style={{
                                            width: 50,
                                            height: 80,
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            borderRadius: 10,
                                            textAlign: "center",
                                            fontSize: 20,
                                            color: "white"
                                        }}
                                        value={code.slice(num, num + 1) === "-" ? "" : code.slice(num, num + 1)}
                                        onChangeText={(val) => {
                                            val = val == "" ? "-" : val
                                            const str = code
                                            setCode(str.substring(0, num) + val + str.substring(num + 1))
                                            if (val !== "-") setActiveInput(activeInput! + 1)
                                        }}
                                    />
                                })}
                            </View>
                            <TouchableOpacity style={{
                                width: "80%",
                                borderRadius: 10,
                                marginTop: 20,
                                height: 60, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(44, 37, 255)"
                            }}
                                onPress={verifyCode}
                            ><Text style={{
                                color: "white",
                                fontWeight: "bold",
                            }}>Doğrula</Text></TouchableOpacity>
                        </View>
                        }
                        {!sendForgotPasswordCodeFn.isSuccess && <TouchableOpacity style={{
                            width: "80%",
                            borderRadius: 10,
                            marginTop: 20,
                            height: 60,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                            onPress={() => {
                                sendForgotPasswordCodeFn.mutate(email)
                            }}
                        ><Text style={{
                            color: "rgb(44, 37, 255)",
                            fontWeight: "bold",
                            fontSize: 18
                        }}>Mailime Kod Gönder</Text></TouchableOpacity>}

                        {verifyCodeFn.error && verifyCodeFn.error instanceof AxiosError &&
                            <Text style={{ color: "red", width: "80%", fontWeight: "bold", fontSize: 20, textAlign: "center", marginTop: 20 }}>
                                {verifyCodeFn.error.response!.data.message}</Text>}
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
            <Loading isShown={verifyCodeFn.isPending || sendForgotPasswordCodeFn.isPending} />
        </ImageBackground>
    )
}

export default ConfirmForgotPasswordCode