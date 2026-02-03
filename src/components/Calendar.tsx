import { MaterialIcons } from "@expo/vector-icons";
import { forwardRef } from "react";
import { FlatList, FlatListProps, ListRenderItemInfo, Text, View } from "react-native";

const DayBox = (item: ListRenderItemInfo<number>) => {
    return (
        <View className="h-15 w-[14.28%] flex flex-col items-center justify-start gap-1">
            <View className="pt-1">
                <Text className="text-center">{item.item}</Text>
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
                    <Text className="text-fix font-lexend-7 leading-[20px] text-lg text-center text-primary-text">October 2023</Text>
                </View>
                <View className="flex-1 flex items-center justify-center">
                    <MaterialIcons name="chevron-right" size={20} color="#111418" className="flex-1" />
                </View>
            </View>
            <View className="flex flex-row items-center justify-around">
                <Text className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">S</Text>
                <Text className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">M</Text>
                <Text className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">T</Text>
                <Text className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">W</Text>
                <Text className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">T</Text>
                <Text className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">F</Text>
                <Text className="text-fix font-lexend-6 leading-[14px] text-xs text-[#637588]">S</Text>
            </View>
            <View className="py-4">
                <FlatList data={Array.from({length: 31}, (_, i) => i + 1)} renderItem={ (item) => DayBox(item) } numColumns={7} />
            </View>
        </View>
    );
})