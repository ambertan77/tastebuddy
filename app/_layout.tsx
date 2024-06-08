import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/login/index" options={{ headerShown: false}} />
        <Stack.Screen name="screens/signup/index" options={{ headerShown: false}} />
        <Stack.Screen name="screens/home/index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/map/index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/calendar/index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/search/index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/feed/index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/profile/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
