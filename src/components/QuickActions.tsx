import { AppText } from '@/components/AppText';
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";
import { QuickAction } from "./QuickAction";
import { router } from 'expo-router';

export const QuickActions = () => {
    return (
        <View className='my-4 mx-4 flex flex-col gap-3 items-stretch select-none'>
            <View className='flex flex-row h-7 items-center justify-between'>
                <AppText className='text-primary-text leading-[20px] text-lg text-fix font-lexend-7 grow'>Quick Actions</AppText>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerClassName='min-w-full flex flex-row justify-around gap-4'>
                <QuickAction icon="check-circle" actionText="Mark Present" />
                <QuickAction onPress={() => { router.push({pathname: '/calendar', params: { expanded: 'true' }}); }} icon="schedule" actionText="Schedule" />
                <QuickAction onPress={() => { router.push('/stats'); }} icon="bar-chart" actionText="Analytics" />
                <QuickAction onPress={() => { router.push('/manage-subjects'); }} icon="library-books" actionText="Manage" />
            </ScrollView>
        </View>

    );
}