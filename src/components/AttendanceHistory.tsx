import { AttendanceType, AttendanceTypes } from "@/constants/attendance";
import { colors } from "@/constants/colors";
import { transform } from "@babel/core";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ColorValue, Pressable, Text, View } from "react-native";
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
                    <Text className="text-primary-text text-fix font-lexend-7 leading-[24px] text-xl">Attendance History{"\u200B"}</Text>
                </View>
                {/* <View>
                    <Text className="text-ui text-fix font-lexend-4 leading-[16px] text-sm">View All{"\u200B"}</Text>
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
            transform: [{
                translateX: withSpring(status * 80)
            }]
        };
    });

    return (
        <View className="bg-[#FFFFFF] h-32 flex flex-col justify-between rounded-lg p-4 gap-4">
            <View className="flex flex-row gap-4">
                <View className={`size-12 rounded-lg items-center justify-center ${divClasses[status]}`}>
                    <MaterialIcons name={iconClasses[status]} color={colorStyles[status]} size={24} />
                </View>
                <View className="flex flex-col justify-center">
                    <Text className='text-primary-text leading-[18px] text-[16px] text-fix font-lexend-6'>Oct 24, 2023</Text>
                    <Text className='text-secondary-text leading-[16px] text-sm text-fix font-lexend-4 select-none'>10:00 AM • Lecture 12</Text>
                </View>
            </View>
            <View className="bg-light-border h-10 rounded-lg flex flex-row p-1 items-center gap-2">
                <Animated.View style={[{position: 'absolute', width: 72, left: 4, top: 4, bottom: 4, backgroundColor: '#FFFFFF', borderRadius: 4}, animatedStyle]} />
                { AttendanceTypes.map((curr_status, index) => 
                    <Pressable onPress={() => {setStatus(curr_status);}} className={`rounded-sm h-full flex items-center justify-center px-3 py-2 max-w-18`}>
                        <Text textBreakStrategy="simple" className={`text-fix leading-[40px] text-xs ${curr_status == status ? `${colorClasses[curr_status]} font-lexend-7 ` : 'text-[#64748B] font-lexend-5'}`}>{AttendanceType[curr_status]}</Text>
                    </Pressable>
                ) }
            </View>
        </View>
    );
}