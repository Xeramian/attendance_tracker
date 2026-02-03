import { MaterialIcons } from "@expo/vector-icons";
import { ColorValue, View } from "react-native";
import { AppText } from "./AppText";

export const SettingsTile = ({ icon, primaryColor, secondaryColor, value }: { icon: MaterialIconName, primaryColor: ColorValue, secondaryColor: ColorValue, value: string }) => {
    return (
        <View className="flex-row h-18 p-4 gap-4 border border-light-border items-center">
            <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, backgroundColor: secondaryColor }}>
                <MaterialIcons name={icon} size={24} color={primaryColor} />
            </View>
            <View className="flex flex-row items-center select-none flex-1 justify-start">
                <AppText className='text-primary-text leading-[18px] text-[16px] text-fix font-lexend-5'>{value}</AppText>
            </View>
            <View className="size-5 flex items-center justify-center">
                <MaterialIcons name="chevron-right" size={20} color={"#9CA3AF"} />
            </View>
        </View>
   );
}