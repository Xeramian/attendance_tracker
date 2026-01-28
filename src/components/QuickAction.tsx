import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Text, View } from "react-native";

export const QuickAction = ({ icon, actionText }: { icon: MaterialIconName, actionText: string }) => {
    return (
        <View className='flex flex-col gap-2 items-center'>
            <View className='size-16 rounded-2xl bg-ui-accent flex flex-row items-center justify-center'>
                <MaterialIcons name={icon} color="#137FEC" size={30} />
            </View>
            <Text className='text-tertiary-text text-xs font-lexend-5 text-center'>{actionText}</Text>
        </View>
    );
}