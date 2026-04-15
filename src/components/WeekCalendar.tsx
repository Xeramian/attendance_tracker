import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Platform, Pressable, View } from "react-native";
import { AppText } from "./AppText";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { getClasses } from "@/store/SubjectStore";

const SubjectCard = ({ title, venue, startTime, endTime }: { title: string, venue: string, startTime: Date, endTime: Date }) => {
    return (
        <View className="flex-1 flex flex-row items-start justify-between bg-[#FFFFFF] rounded-2xl p-4">
            <View className="flex flex-col shrink">
                <AppText className="text-fix font-lexend-7 text-[16px] text-primary-text">{title}</AppText>
                <AppText className="text-fix font-lexend-5 text-xs text-[#137FEC]">{endTime.getHours() * 60 + endTime.getMinutes() - startTime.getHours() * 60 - startTime.getMinutes()}</AppText>
            </View>
            <View className="flex items-center justify-center p-2 rounded-md bg-purple-background">
                <AppText className="text-fix font-lexend-6 text-xs text-purple">{venue}</AppText>
            </View>
        </View>
    );
}

const DayBox = ({ day, date, selected, onSelect }: {day: string, date: string, selected: boolean, onSelect?: () => void}) => {
    return (
        <Pressable onPress={onSelect} className={`flex flex-col rounded-full items-center gap-2 p-2 w-12 ${selected ? 'bg-subject-blue' : ''}`}>
            <AppText className={`text-fix font-lexend-6 text-sm ${selected ? 'text-[#FFFFFF]' : 'text-[#637588]'}`}> {day} </AppText>
            <AppText className={`text-fix font-lexend-6 text-[16px] ${selected ? 'text-[#FFFFFF]' : 'text-primary-text'}`}> {date} </AppText>
        </Pressable>
    );
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const WeekCalendar = () => {

    const [selectedTime, setSelectedTime] = useState(new Date());

    const [time, setTime] = useState(new Date());

    return (
        <View className="bg-[#FFFFFF] flex flex-col gap-4 flex-1">
            <View className="h-16 flex flex-row justify-around items-center">
                <Pressable onPress={() => {setTime((prevDate) => { return new Date(prevDate.setDate(prevDate.getDate() - 7)) })}} className="flex-1 flex items-center justify-center">
                    <MaterialIcons name="chevron-left" size={20} color="#111418" />
                </Pressable>
                <View className="flex-5 flex items-center justify-center">
                    {
                        (() => {
                            const t1 = new Date(time);
                            t1.setDate(t1.getDate() - t1.getDay());
                            const t2 = new Date(time);
                            t2.setDate(t2.getDate() - t1.getDay() + 6);
                            if (t1.getMonth() == t2.getMonth()) {
                                return <AppText className="text-fix font-lexend-7 leading-[20px] text-lg text-center text-primary-text">{MONTHS[time.getMonth()]} {time.getFullYear()}</AppText>
                            } else if (t1.getFullYear() == t2.getFullYear()) {
                                return <AppText className="text-fix font-lexend-7 leading-[20px] text-lg text-center text-primary-text">{MONTHS[t1.getMonth()].substring(0, 3)} - {MONTHS[t2.getMonth()].substring(0, 3)} {t2.getFullYear()}</AppText>
                            } else {
                                return <AppText className="text-fix font-lexend-7 leading-[20px] text-lg text-center text-primary-text">{MONTHS[t1.getMonth()].substring(0, 3)} {t1.getFullYear()} - {MONTHS[t2.getMonth()].substring(0, 3)} {t2.getFullYear()}</AppText>
                            }
                        })()
                    }
                </View>
                <Pressable onPress={() => {setTime((prevDate) => { return new Date(prevDate.setDate(prevDate.getDate() + 7)) })}} className="flex-1 flex items-center justify-center">
                    <MaterialIcons name="chevron-right" size={20} color="#111418" className="flex-1" />
                </Pressable>
            </View>
            <View className="flex flex-row items-center justify-around">
                {
                    Array.from({ length: 7 }, (_, i) => i).map((i, index) => {
                        const temp = new Date(time);
                        temp.setDate(temp.getDate() - temp.getDay() + i);
                        return <DayBox key={index} day={`${['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}`} date={`${temp.getDate()}`} selected={selectedTime.toLocaleDateString() == temp.toLocaleDateString()} onSelect={() => {setSelectedTime(temp)}} />;
                    })
                }
            </View>
            <ScrollView className="bg-page relative" contentContainerClassName="flex flex-row" showsVerticalScrollIndicator={Platform.OS=='web'}>
                <View className="flex flex-col gap-8 flex-1 relative">
                    <View className="absolute w-32 items-stretch flex flex-row h-full justify-center">
                        <View className="w-2 rounded-full bg-page-offset my-8" />
                    </View>
                    <View className="py-8 flex flex-col gap-8">
                    {
                        getClasses(selectedTime.toDateString()).map(({ title, venue, startTime, endTime }, index) => 
                            <View key={index} className="flex flex-row pr-8">
                                <View className="flex flex-col gap-1 w-32 items-center">
                                    <View className="rounded-full size-5 bg-white flex items-center justify-center">
                                        <View className="rounded-full size-3 bg-[#137FEC]" />
                                    </View>
                                    <View className="bg-white rounded-sm h-6 w-12 items-center justify-center">
                                        <AppText className="text-fix font-lexend-7 leading-[20px] text-center text-sm text-primary-text"> {`${(startTime.getHours() % 12).toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')} ${startTime.getHours() < 12 ? 'AM' : 'PM'}`}</AppText>
                                    </View>
                                </View>
                                <SubjectCard title={title} venue={venue} startTime={startTime} endTime={endTime} />
                            </View>                        
                        )
                    }
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}