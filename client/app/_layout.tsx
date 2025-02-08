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
  const [loaded, error] = useFonts({
    'VeganStyle': require('../assets/fonts/VeganStyle.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
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
