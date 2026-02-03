import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { AppText } from "./AppText";

export const LogOutButton = () => {
    return (
        <View className="mx-4 bg-red-background rounded-xl h-14 flex-row items-center justify-center gap-2 select-none">
            <MaterialIcons name="logout" color="#DC2626" size={20} />
            <AppText className="text-[#DC2626] leading-[18px] text-[16px] text-fix font-lexend-7">Log Out</AppText>
        </View>
    );
}