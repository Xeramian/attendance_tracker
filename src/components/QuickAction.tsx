import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const QuickAction = ({ icon, actionText }: { icon: MaterialIconName, actionText: string }) => {
    return (
        <View className='flex flex-col gap-2 items-center grow shrink-0 min-w-20'>
            <View className='size-16 rounded-2xl bg-ui-accent flex flex-row items-center justify-center'>
                <MaterialIcons name={icon} color="#137FEC" size={30} />
            </View>
            <View className="flex-row items-center justify-center px-1">
                <Text className='text-tertiary-text text-xs font-lexend-5 text-center grow'>{actionText}</Text>
            </View>
        </View>
    );
}