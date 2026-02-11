import { AppText } from '@/components/AppText';
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Pressable } from 'react-native';

export const QuickAction = ({ icon, actionText, onPress }: { icon: MaterialIconName, actionText: string, onPress?: () => void }) => {
    return (
        <Pressable onPress={onPress} className='flex flex-col gap-2 items-center grow'>
            <View className='size-16 rounded-2xl bg-ui-accent flex flex-row items-center justify-center'>
                <MaterialIcons name={icon} color="#137FEC" size={30} />
            </View>
            <View className="items-center justify-center">
                <AppText className='text-tertiary-text text-xs text-fix font-lexend-5 text-center'>{actionText}</AppText>
            </View>
        </Pressable>
    );
}