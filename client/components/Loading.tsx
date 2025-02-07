import { View, Text, ActivityIndicator, Modal } from 'react-native'
import React, { FC, ReactElement, ReactNode } from 'react'
import { BlurView } from 'expo-blur'
import { ImageBackground } from 'expo-image'


interface LoadingProps {
    isShown: boolean,
    blurHash?: string,
    children?: ReactNode
    intensity?: number
}
const Loading = ({ isShown, blurHash, children, intensity }: LoadingProps): JSX.Element => {
    return (
        <Modal transparent={true} animationType="fade" visible={isShown}>
            <BlurView style={{ flex: 1, justifyContent: "center", alignItems: "center" }} intensity={intensity || 60}>
                {blurHash ? <ImageBackground placeholder={{ blurHash }} style={{ flex: 1 }}><ActivityIndicator size="large" /></ImageBackground> : <ActivityIndicator size="large" />}
            </BlurView>
        </Modal>

    )
}

export default Loading