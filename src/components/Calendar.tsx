import { MaterialIcons } from "@expo/vector-icons";
import { forwardRef } from "react";
import { FlatList, FlatListProps, ListRenderItemInfo, View } from "react-native";
import { AppText } from "./AppText";

const DayBox = (item: ListRenderItemInfo<number>) => {
    return (
        <View className="h-15 w-[14.28%] flex flex-col items-center justify-start gap-1">
            <View className="pt-1">
                <AppText className="text-center">{item.item}</AppText>
            </View>
            { item.item % 3 == 0 && <View className="size-1.5 bg-[#22C55E] rounded-full" /> }
        </View>
    );
}

export const Calendar = forwardRef<View>((_, ref) => {
    return (
        <View ref={ref} className="flex flex-col gap-4">
            <View className="h-16 flex flex-row justify-around items-center">
                <View className="flex-1 flex items-center justify-center">
                    <MaterialIcons name="chevron-left" size={20} color="#111418" />
                </View>
                <View className="flex-5 flex items-center justify-center">
                    <AppText className="text-fix font-lexend-7 leading-[20px] text-lg text-center text-primary-text">October 2023</AppText>
                </View>
                <View className="flex-1 flex items-center justify-center">
                    <MaterialIcons name="chevron-right" size={20} color="#111418" className="flex-1" />
                </View>
            </View>
            <View className="flex flex-row items-center justify-around">
                <AppText className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">S</AppText>
                <AppText className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">M</AppText>
                <AppText className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">T</AppText>
                <AppText className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">W</AppText>
                <AppText className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">T</AppText>
                <AppText className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">F</AppText>
                <AppText className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">S</AppText>
            </View>
            <View className="py-4">
                <FlatList data={Array.from({length: 31}, (_, i) => i + 1)} renderItem={ (item) => DayBox(item) } numColumns={7} />
            </View>
        </View>
    );
})