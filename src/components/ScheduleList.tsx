import { MaterialIcons } from "@expo/vector-icons";
import { Ref, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Platform, Pressable, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector, ScrollView } from "react-native-gesture-handler";
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { AppText } from "./AppText";
import { useFocusEffect } from "expo-router";
import { getClasses, useSubjectStore } from "@/store/SubjectStore";

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

const DAYS = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];

export const ScheduleList = ({date, initialExpanded, maximumTopDisplacement}: {date: Date, initialExpanded: boolean, maximumTopDisplacement?: number}) => {

    const todayClasses = getClasses(date.toDateString());

    // forEach((_class) => {
        
    // }, classes);

    const context = useSharedValue(0);
    const translateY = useSharedValue(initialExpanded ? -(maximumTopDisplacement??0) : 0);
    
    useFocusEffect(useCallback(() => {
        translateY.value = withSpring(initialExpanded ? -(maximumTopDisplacement??0) : 0);
        return () => translateY.value = 0;
    }, [initialExpanded, maximumTopDisplacement]));

    const [height, setHeight] = useState(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            height: height - translateY.value
        };
    });
    
    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            height: height - translateY.value
        };
    });

    const onLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setHeight(height);
    }

    const panGesture = Gesture.Pan()
        .onStart(() => {
            context.value = translateY.value;
        })
        .onUpdate((event) => {
            translateY.value = clamp(context.value + event.translationY, -(maximumTopDisplacement??0), 200);
        })
        .onEnd((event) => {
            const shouldSnapUp = event.velocityY < 0;
            translateY.value = withSpring(shouldSnapUp ? -(maximumTopDisplacement??0) : 0);
        })

    return (
        <Animated.View onLayout={onLayout} style={[animatedStyle, { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }, Platform.OS === 'web' && ({ touchAction: 'none', willChange: 'transform', userSelect: 'none' } as any)]}>
            <Animated.View style={[{display: "flex", flexDirection: 'column', paddingTop: 12, gap: 4, borderTopWidth: 2, backgroundColor: '#FFFFFF', borderColor: '#F3F4F6', borderTopLeftRadius: 24, borderTopRightRadius: 24, }, animatedStyle2]}>
                <GestureDetector gesture={panGesture}>
                    <View>
                        <View className="w-20 h-2 rounded-full bg-page-offset self-center" />
                        <View className="flex flex-row px-5 py-4 justify-between self-stretch">
                            <View className="flex flex-col gap-0.5">
                                <AppText className="text-primary-text text-fix font-lexend-7 leading-[24px] text-xl">{MONTHS[date.getMonth()]} {date.getDate()}, {DAYS[date.getDay()]}</AppText>
                                <AppText className="text-[#6B7280] text-fix font-lexend-4 leading-[16px] text-sm">3 Classes • 1 Absent</AppText>
                            </View>
                            {/* <View className="self-stretch items-center justify-center size-10 bg-ui-accent rounded-full">
                                <MaterialIcons name="calendar-today" size={20} color={'#137FEC'} />
                            </View> */}
                        </View>
                    </View>
                </GestureDetector>
                <View className="flex-1">
                    <ScrollView contentContainerClassName="flex flex-col p-5 gap-4 items-stretch justify-start" showsVerticalScrollIndicator={Platform.OS=='web'}>
                        
                        {
                            todayClasses.map(({ title, venue, startTime, endTime }, index) => {
                                const startsIn = (startTime.getHours() * 60 + startTime.getMinutes() - new Date().getHours() * 60 - new Date().getMinutes())
                                const endsIn = (endTime.getHours() * 60 + endTime.getMinutes() - new Date().getHours() * 60 - new Date().getMinutes())
                                return <ScheduleCard
                                    key={index}
                                    title={title}
                                    venue={venue}
                                    attended={true}
                                    status={startsIn > 0 ? "Upcoming" : startsIn < 0 && endsIn > 0 ? "Ongoing" : "Completed"}
                                    startsIn={startsIn}
                                    startTime={`${(startTime.getHours() % 12).toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')} ${startTime.getHours() < 12 ? 'AM' : 'PM'}`}
                                    endTime={`${(endTime.getHours() % 12).toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')} ${endTime.getHours() < 12 ? 'AM' : 'PM'}`}
                                />
                            }
                            )
                        }

                        {/* <ScheduleCard 
                            title="Signals and Systems"
                            venue="L2, LHC"
                            status="Ongoing" 
                            startsIn={0} 
                            attended={true} 
                        />

                        <ScheduleCard 
                            title="Digital Design"
                            venue="5G1, Core 5"
                            status="Upcoming" 
                            startsIn={45} 
                            attended={false} 
                        />

                        <ScheduleCard 
                            title="Microprocessors"
                            venue="5004, Core 5"
                            status="Upcoming" 
                            startsIn={180} 
                            attended={false} 
                        />

                        <ScheduleCard 
                            title="Analog Circuits"
                            venue="L3, LHC"
                            status="Completed" 
                            startsIn={-120} 
                            attended={true} 
                        />
                        
                        <ScheduleCard 
                            title="Psychology"
                            venue="1201, Core 1"
                            status="Upcoming" 
                            startsIn={300} 
                            attended={false} 
                        />

                    {/* Missed Class (HSS Elective) */}
                    {/* <ScheduleCard 
                        status="Missed" 
                        startsIn={-300} 
                        attended={false} 
                    /> */}
                    {/* </View> */}
                    </ScrollView>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

const ScheduleCard = ({ title, venue, status, attended, startsIn, startTime, endTime }: { title: string, venue: string, status: 'Completed'|'Ongoing'|'Upcoming', attended: boolean, startsIn: number, startTime: string, endTime: string }) => {
    return (
        <View className="w-full gap-3 p-4 border-2 border-light-border rounded-xl">
            <View className="flex flex-col gap-3">
                <View className="flex grow-0 flex-row justify-between gap-4">
                    <View className="flex flex-col gap-1 flex-1">
                        <View className="flex flex-row gap-1 items-center">
                            {
                                status == 'Completed' ? 
                                    <MaterialIcons name="check-circle" color={"#9CA3AF"} size={14} />
                                : status == 'Ongoing' ? 
                                    <MaterialIcons name="play-circle" color={"#137FEC"} size={14} />
                                : status == 'Upcoming' ?
                                    <MaterialIcons name="schedule" color={"#F97316"} size={14} />
                                : <></>
                            }
                            <AppText className={`${status == 'Completed' ? `text-[#9CA3AF]` : status == 'Ongoing' ? 'text-[#137FEC]' : status == "Upcoming" ? 'text-[#F97316]' : ''} text-fix font-lexend-7 text-2xs`}>{status}</AppText>
                        </View>
                        <AppText className="text-primary-text text-fix font-lexend-7 text-lg">{title}</AppText>
                    </View>
                    <View className="flex shrink-0 flex-col items-end">
                        <AppText className={`${status == 'Ongoing' ? 'text-[#137FEC]' : 'text-primary-text'} text-fix font-lexend-6 text-sm`}>{startTime}</AppText>
                        <AppText className="text-secondary-text text-fix font-lexend-4 text-xs">{endTime}</AppText>
                    </View>
                </View>
                <View className="h-0.5 bg-light-border rounded-full" />
                <View className="flex flex-row items-center gap-2">
                    <View className="flex flex-row gap-0.5 items-center">
                        <MaterialIcons name="location-pin" color={"#9CA3AF"} size={16} />
                        <AppText className="text-secondary-text text-fix font-lexend-4 text-xs">{venue}</AppText>
                    </View>
                    <View className={`h-8 py-1.5 items-center flex flex-row ${(status == 'Upcoming' || attended) ? '' : 'px-3 bg-[#137FEC] rounded-lg'}`}>
                        {
                            status == 'Upcoming' ?
                                <View>
                                    <AppText className="text-[#9CA3AF] text-fix font-lexend-4 text-xs">Starts in {startsIn}m</AppText>
                                </View>
                            : attended ?
                                <View className="flex flex-row gap-1 items-center">
                                    <MaterialIcons name="verified" color={"#16A34A"} size={16} />
                                    <AppText className="text-[#16A34A] text-fix font-lexend-4 text-xs">{status == 'Ongoing' ? 'Attending' : 'Attended'}</AppText>
                                </View>
                            :
                                <View>
                                    <AppText className="text-[#FFFFFF] text-fix font-lexend-7 text-2xs">MARK PRESENT</AppText>
                                </View>
                        }
                    </View>
                </View>
            </View>
            {/* <View className="flex flex-row items-center">
                <View className="flex flex-row flex-1">
                    <View className="flex flex-col">
                        <AppText className="text-primary-text text-fix font-lexend-7 leading-[24px] text-xl">Mathematics</AppText>
                        <AppText className="text-[#6B7280] text-fix font-lexend-4 leading-[16px] text-sm">Room 301</AppText>
                    </View>
                </View>
                <View className="flex flex-row items-center justify-center size-8 rounded-full bg-[#DCFCE7]">
                    <MaterialIcons name="check" size={18} color={'#16A34A'} />
                </View>
            </View> */}
        </View>
    );
}