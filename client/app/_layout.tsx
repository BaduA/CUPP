import { useFonts } from 'expo-font';
import { Redirect, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider, useSession } from '@/api/auth/ctx';
import { Provider } from "react-redux";
import { store } from "../redux/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
      <Provider store={store}>
        <Slot></Slot>
      </Provider>
      </SessionProvider>
    </QueryClientProvider >
  );
}
