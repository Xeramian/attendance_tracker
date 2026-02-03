import { AppText } from '@/components/AppText';
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";
import { QuickAction } from "./QuickAction";

export const QuickActions = () => {
    return (
        <View className='my-4 mx-4 flex flex-col gap-3 items-stretch select-none'>
            <View className='flex flex-row h-7 items-center justify-between'>
                <AppText className='text-primary-text leading-[20px] text-lg text-fix font-lexend-7 grow'>Quick Actions</AppText>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerClassName='min-w-full flex flex-row justify-around gap-4'>
                <QuickAction icon="check-circle" actionText="Mark Present" />
                <QuickAction icon="add-circle" actionText="Add Class" />
                <QuickAction icon="bar-chart" actionText="Analytics" />
                <QuickAction icon="event-busy" actionText="Request Leave" />
            </ScrollView>
        </View>

    );
}