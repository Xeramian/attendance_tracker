import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import '../../global.css';
import { MaterialIcons } from '@expo/vector-icons';

export default function _RootLayout() {
    useFonts({
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
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { borderColor: '#F3F4F6', borderTopWidth: 2, elevation: 0, shadowOpacity: 0 },
                tabBarActiveTintColor: '#137FEC',
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ size, color }) => <MaterialIcons name='home' size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='calendar'
                options={{
                    title: 'Calendar',
                    tabBarIcon: ({ size, color }) => <MaterialIcons name='calendar-month' size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='stats'
                options={{
                    title: 'Stats',
                    tabBarIcon: ({ size, color }) => <MaterialIcons name='bar-chart' size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ size, color }) => <MaterialIcons name='person' size={size} color={color} />
                }}
            />
        </Tabs>
    );
}