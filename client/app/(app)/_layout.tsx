import { useFonts } from 'expo-font';
import { Redirect, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import * as SecureStore from "expo-secure-store";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const authState = useSelector((state: RootState) => state.auth)
  useEffect(()=>{
    console.log("Root Layout")
  },[])

  var token = SecureStore.getItem("token")
  console.log("Token:"+token)
  if (!token) return <Redirect href={"/(auth)"}></Redirect>
  return (
    <Stack>
    </Stack>
  );
}
