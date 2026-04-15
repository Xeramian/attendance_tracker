import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, ListRenderItemInfo, Pressable, View } from "react-native";
import { AppText } from "./AppText";
import { useEffect, useState } from "react";
import { getClasses } from "@/store/SubjectStore";

const DayBox = (date: Date, item: ListRenderItemInfo<number>, selected: boolean, onPress?: () => void) => {
    return (
        <View className="h-12 w-[14.28%] flex flex-col items-center justify-start">
                <Pressable onPress={onPress} className={`size-10 rounded-full ${selected ? `bg-subject-blue` : ``}`}>
                    <View className="flex flex-col items-center justify-between h-8">
                        <View className="pt-1">
                            <AppText className={`font-lexend-6 text-center ${selected ? 'text-white' : `text-primary-text`}`}>{item.item}</AppText>
                        </View>
                        { getClasses(date.toDateString()).length > 0 && <View className="size-1.5 bg-subject-green rounded-full" /> }
                    </View>
                </Pressable>
        </View>
    );
}

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const MonthCalendar = ({ onChangeDate }: { onChangeDate?: (date: Date) => void }) => {

    const [selectedMonth, setSelectedMonth] = useState(new Date((new Date()).getFullYear(), (new Date()).getMonth()));
    const [selectedDay, setSelectedDay] = useState((new Date()).getDate());

    useEffect(() => {
        onChangeDate?.(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), selectedDay));
    }, [selectedDay, selectedMonth])

    return (
        <View className="flex flex-col gap-4">
            <View className="h-16 flex flex-row justify-around items-center">
                <Pressable onPress={() => { setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1)) }} className="flex-1 flex items-center justify-center">
                    <MaterialIcons name="chevron-left" size={20} color="#111418" />
                </Pressable>
                <View className="flex-5 flex items-center justify-center">
                    <AppText className="text-fix font-lexend-7 leading-[20px] text-lg text-center text-primary-text">{MONTHS[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}</AppText>
                </View>
                <Pressable onPress={() => { setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1)) }} className="flex-1 flex items-center justify-center">
                    <MaterialIcons name="chevron-right" size={20} color="#111418" className="flex-1" />
                </Pressable>
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
            <View className="py-2">
                <FlatList data={Array.from({length: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate()}, (_, i) => i + 1)} renderItem={ (item) => DayBox(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), item.item), item, selectedDay == item.item, () => { setSelectedDay(item.item); }) } numColumns={7} />
            </View>
        </View>
    );
}