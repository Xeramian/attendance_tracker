import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function _Layout() {
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