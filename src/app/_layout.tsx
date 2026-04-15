import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, Tabs } from 'expo-router';
import '../../global.css';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function _RootLayout() {

    StatusBar.setBackgroundColor('#000000');

    const [loaded, error] = useFonts({
        'Lexend-ExtraLight': require('assets/fonts/lexend/Lexend-ExtraLight.ttf'),
        'Lexend-Light': require('assets/fonts/lexend/Lexend-Light.ttf'),
        'Lexend-Thin': require('assets/fonts/lexend/Lexend-Thin.ttf'),
        'Lexend-Regular': require('assets/fonts/lexend/Lexend-Regular.ttf'),
        'Lexend-Medium': require('assets/fonts/lexend/Lexend-Medium.ttf'),
        'Lexend-SemiBold': require('assets/fonts/lexend/Lexend-SemiBold.ttf'),
        'Lexend-Bold': require('assets/fonts/lexend/Lexend-Bold.ttf'),
        'Lexend-ExtraBold': require('assets/fonts/lexend/Lexend-ExtraBold.ttf'),
        'Lexend-Black': require('assets/fonts/lexend/Lexend-Black.ttf')
    })

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    return (
        <GestureHandlerRootView>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='(tabs)' />
                <Stack.Screen name='(dynamic)' />
            </Stack>
        </GestureHandlerRootView>
    );
}