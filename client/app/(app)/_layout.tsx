import { useFonts } from 'expo-font';
import { Redirect, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider, useSession } from '@/api/auth/ctx';
import { Text } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {

  const { session, isLoading } = useSession();
  if (isLoading) return <Text>Loading...</Text>
  if (!session) return <Redirect href={"/(auth)"}></Redirect>
  return (
    <Stack>
    </Stack>
  );
}
