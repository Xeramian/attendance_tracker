import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { QuickAction } from "./QuickAction";

export const QuickActions = () => {
    return (
        <View className='my-4 mx-4 flex flex-col gap-3 items-stretch select-none'>
            <View className='flex flex-row h-7 items-center justify-between'>
                <Text className='text-primary-text text-lg font-lexend-7 grow'>Quick Actions</Text>
            </View>
            <ScrollView horizontal={true} contentContainerClassName='min-w-full flex flex-row justify-around gap-4'>
                <QuickAction icon="check-circle" actionText="Mark Present" />
                <QuickAction icon="add-circle" actionText="Add Class" />
                <QuickAction icon="bar-chart" actionText="Analytics" />
                <QuickAction icon="event-busy" actionText="Request Leave" />
            </ScrollView>
        </View>

    );
}