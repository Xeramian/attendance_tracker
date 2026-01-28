import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const Header = ({ title, icon }: { title: string, icon: MaterialIconName }) => {
    return (
        <View className="px-4 py-4 h-25 flex-row items-center justify-between border-b-light-border border-b-2">
            <Text className="font-lexend-7 text-2xl text-primary-text">{title}</Text>
            <MaterialIcons name={icon} size={24} color={'#000000'} />
        </View>
    );
}