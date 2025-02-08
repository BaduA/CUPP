import { useFonts } from 'expo-font';
import { Redirect, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import * as SecureStore from "expo-secure-store";
import { getCurrentUser, logout, setUser } from '@/redux/slices/authSlice';
import { AxiosError } from 'axios';

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const authState = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getCurrentUser(null))
  }, [])
  var token = SecureStore.getItem("token")
  if (!token) return <Redirect href={"/(auth)"}></Redirect>
  if (authState.isError && authState.error instanceof AxiosError) {
    dispatch(logout())
  }
  if (!authState.isSuccess) {
    return <Text>Loading</Text>
  }
  if (!authState.user.verified) {
    return <Redirect href={"/(auth)/confirm-account"}></Redirect>
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
    </Stack>
  );
}
