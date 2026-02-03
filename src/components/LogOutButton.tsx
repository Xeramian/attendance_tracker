import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const LogOutButton = () => {
    return (
        <View className="mx-4 p-4 bg-[#FEF2F2] rounded-xl h-14 flex-row items-center justify-center gap-2 select-none">
            <MaterialIcons name="logout" color="#DC2626" size={20} />
            <Text className="text-[#DC2626] leading-[18px] text-[16px] text-fix font-lexend-7">Log Out</Text>
        </View>
    );
}