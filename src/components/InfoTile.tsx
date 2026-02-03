import { MaterialIcons } from "@expo/vector-icons";
import { ColorValue, View } from "react-native";
import { AppText } from "./AppText";

export const InfoTile = ({ icon, primaryColor, secondaryColor, property, value }: { icon: MaterialIconName, primaryColor: ColorValue, secondaryColor: ColorValue, property: string, value: string }) => {
    return (
        <View className="flex-row h-18 p-4 gap-4 border border-light-border items-center">
            <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, backgroundColor: secondaryColor }}>
                <MaterialIcons name={icon} size={24} color={primaryColor} />
            </View>
            <View className="flex flex-col items-start flex-1">
                <AppText className='text-[#6B7280] leading-[16px] text-sm text-fix font-lexend-5 select-none'>{property}</AppText>
                <AppText numberOfLines={1} className='text-primary-text leading-[18px] text-[16px] text-fix font-lexend-5'>{value}</AppText>
            </View>
            <View className="size-5 flex items-center justify-center">
                <MaterialIcons name="edit" size={20} color={"#9CA3AF"} />
            </View>
        </View>
   );
}