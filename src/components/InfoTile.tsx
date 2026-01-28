import { MaterialIcons } from "@expo/vector-icons";
import { ColorValue, Text, View } from "react-native";

export const InfoTile = ({ icon, primaryColor, secondaryColor, property, value }: { icon: MaterialIconName, primaryColor: ColorValue, secondaryColor: ColorValue, property: string, value: string }) => {
    return (
        <View className="flex-row h-18 p-4 gap-4 border border-light-border items-center">
            <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, backgroundColor: secondaryColor }}>
                <MaterialIcons name={icon} size={24} color={primaryColor} />
            </View>
            <View className="flex flex-col items-start">
                <Text className='text-[#6B7280] text-sm font-lexend-5 select-none'>{property}</Text>
                <Text className='text-primary-text text-[16px] font-lexend-5'>{value}</Text>
            </View>
            <View className="flex-1" />
            <MaterialIcons name="edit" size={20} color={"#9CA3AF"} />
        </View>
   );
}