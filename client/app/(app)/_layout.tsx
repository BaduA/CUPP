import { useFonts } from 'expo-font';
import { Redirect, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import * as SecureStore from "expo-secure-store";
import { getCurrentUser } from '@/api/auth/auth_calls';
import { logout, setUser } from '@/redux/slices/authSlice';
import { AxiosError } from 'axios';

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const { isError, isFetching, isSuccess, data, error, refetch } = getCurrentUser()
  const authState = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    refetch()
  }, [])
  var token = SecureStore.getItem("token")
  
  if (!token) return <Redirect href={"/(auth)"}></Redirect>
  if (isError && error instanceof AxiosError) {
    console.log(error.response!.data)
    dispatch(logout())
  }
  if (!isSuccess) {
    return <Text>Loading</Text>
  }
  if (!authState.user.verified) {
    return <Redirect href={"/(auth)/confirm-account"}></Redirect>
  }

  return (
    <Stack>
    </Stack>
  );
}
