import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';

const ReadQR = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const isGranted = Boolean(permission?.granted)
    if (isGranted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    return (
        <BlurView style={{ flex: 1 }} intensity={60}>
            <Pressable style={{flex:1, justifyContent:"center", alignItems:"center"}} onPress={()=>{router.back()}}>
                <CameraView style={styles.camera} facing='back' ac>

                </CameraView>
            </Pressable>

        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        width:200,
        height:200,
        borderWidth:1,
        borderColor:"black"
    },

});

export default ReadQR