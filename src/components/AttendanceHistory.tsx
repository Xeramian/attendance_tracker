import { AppText } from '@/components/AppText';
import { AttendanceType, AttendanceTypes } from "@/constants/attendance";
import { colors } from "@/constants/colors";
import { transform } from "@babel/core";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ColorValue, Pressable, View } from "react-native";
import Animated, { GentleSpringConfigWithDuration, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const divClasses = {
    [AttendanceType.Present]: 'bg-blue-background',
    [AttendanceType.Absent]: 'bg-red-background',
    [AttendanceType.Excused]: 'bg-orange-background'
} satisfies Record<AttendanceType, string>

const colorClasses = {
    [AttendanceType.Present]: 'text-blue',
    [AttendanceType.Absent]: 'text-red',
    [AttendanceType.Excused]: 'text-orange'
} satisfies Record<AttendanceType, string>

const colorStyles = {
    [AttendanceType.Present]: colors.blue,
    [AttendanceType.Absent]: colors.red,
    [AttendanceType.Excused]: colors.orange
} satisfies Record<AttendanceType, string>

const iconClasses = {
    [AttendanceType.Present]: 'calendar-today',
    [AttendanceType.Absent]: 'event-busy',
    [AttendanceType.Excused]: 'sick'
} satisfies Record<AttendanceType, MaterialIconName>

export const AttendanceHistory = ({ attendance }: { attendance: Array<{ time: Date, status: AttendanceType }> }) => {

    return (
        <View className="flex flex-col gap-6 px-4">
            <View className="flex flex-row justify-between">
                <View>
                    <AppText className="text-primary-text text-fix font-lexend-7 leading-[24px] text-xl">Attendance History{"\u200B"}</AppText>
                </View>
                {/* <View>
                    <AppText className="text-ui text-fix font-lexend-4 leading-[16px] text-sm">View All{"\u200B"}</AppText>
                </View> */}
            </View>
            <View className="gap-4 flex flex-col">
                { attendance.map((item, index) => 
                    <AttendanceItem key={index} item={item} />
                )}

            </View>
        </View>
    );
}

const AttendanceItem = ({ item }: { item: { time: Date, status: AttendanceType } }) => {
    
    const [status, setStatus] = useState(item.status);

    useEffect(() => {

    }, [status]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            left: withSpring(4 + 72*status)
        };
    });

    return (
        <View className="bg-[#FFFFFF] h-32 flex flex-col justify-between rounded-lg p-4 gap-4">
            <View className="flex flex-row gap-4">
                <View className={`size-12 rounded-lg items-center justify-center ${divClasses[status]}`}>
                    <MaterialIcons name={iconClasses[status]} color={colorStyles[status]} size={24} />
                </View>
                <View className="flex flex-col justify-center">
                    <AppText className='text-primary-text leading-[18px] text-[16px] text-fix font-lexend-6'>Oct 24, 2023</AppText>
                    <AppText className='text-secondary-text leading-[16px] text-sm text-fix font-lexend-4 select-none'>10:00 AM • Lecture 12</AppText>
                </View>
            </View>
            <View className="bg-light-border h-10 rounded-lg flex flex-row items-center py-1">
                <Animated.View style={[{position: 'absolute', width: 72, top: 4, bottom: 4, backgroundColor: '#FFFFFF', borderRadius: 4}, animatedStyle]} />
                { AttendanceTypes.map((curr_status, index) => 
                    <Pressable key={index} onPress={() => {setStatus(curr_status);}} style={{ position: 'absolute', top: 4, bottom: 4, left: 4 + curr_status * 72, alignItems: 'center', justifyContent: 'center', width: 72 }}>
                        <AppText textBreakStrategy="simple" className={`text-fix text-center text-xs ${curr_status == status ? `${colorClasses[curr_status]} font-lexend-7 ` : 'text-[#64748B] font-lexend-5'}`}> {AttendanceType[curr_status]} </AppText>
                    </Pressable>
                ) }
            </View>
        </View>
    );
}