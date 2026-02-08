// app/stats/[subjectId].tsx
import * as Haptics from 'expo-haptics';
import { AppText } from '@/components/AppText';
import { AttendanceHistory } from '@/components/AttendanceHistory';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/PageLayout';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { AttendanceType } from '@/constants/attendance';
import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent, Platform, Pressable, ScrollView, View } from 'react-native';
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler';
import { PanGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture';
import Animated, { Easing, clamp, interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { actions } from '@/constants/actions';

const subjectColorPrimary = '#2563EB';
const subjectColorSecondary = '#EFF6FF';

export default function AttendanceDetailsScreen() {
    const { subjectID } = useLocalSearchParams<{ subjectID: string }>();

    const [selectedTiming, setSelectedTiming] = useState(0);

    return (
        <PageLayout>
            <Header heading={"Subject Notifications"} centerHeading={true} leftActions={[actions.back]} />
            <ScrollView showsVerticalScrollIndicator={Platform.OS == 'web'} >
                <View className='flex flex-col pt-6 pb-8 px-4 gap-8'>
                    <View style={{ display: 'flex', flexDirection: 'row', borderRadius: 16, backgroundColor: subjectColorPrimary, padding: 24, justifyContent: 'space-between' }}>
                        <View className='flex flex-col gap-2'>
                            <View className='px-2 py-1 flex flex-row rounded-md bg-[#FFFFFF]/20 self-start'>
                                <AppText className='text-[#FFFFFF] text-xs text-fix font-lexend-5'>Course Code: CS205</AppText>
                            </View>
                            <View>
                                <AppText className='text-[#FFFFFF] text-2xl text-fix font-lexend-7'>Computer Science</AppText>
                            </View>
                            <View>
                                <AppText className='text-[#FFFFFF]/80 text-sm text-fix font-lexend-4'>Prof. Sarah Wilson</AppText>
                            </View>
                        </View>
                        <View className='px-2 py-1 flex flex-row rounded-md bg-[#FFFFFF]/20 self-start'>
                            <MaterialIcons name="functions" size={30} color="#FFFFFF" />
                        </View>
                    </View>
                    <View className='flex flex-col gap-3'>
                        <AppText className='text-secondary-text text-xs text-fix font-lexend-6'>NOTIFICATION SCHEDULE</AppText>
                        <View className='flex flex-col bg-[#FFFFFF] rounded-xl border-4 border-light-border'>
                            <NotificationSchedule day='MON' title='Morning Session' time='10:00 AM - 11:30 AM' />
                            <View className='h-0.5 bg-light-border' />
                            <NotificationSchedule day='WED' title='Afternoon Lab' time='2:00 PM - 3:30 PM' />
                            <View className='h-0.5 bg-light-border' />
                            <NotificationSchedule day='FRI' title='Review Class' time='9:00 AM - 10:00 AM' />
                        </View>
                    </View>
                    <View className='flex flex-col gap-3'>
                        <AppText className='text-secondary-text text-xs text-fix font-lexend-6'>REMINDER TIMING</AppText>
                        <View className='flex flex-col bg-[#FFFFFF] rounded-xl border-4 border-light-border p-2 gap-2'>
                            <SelectionModule text='At class start' selected={selectedTiming == 0} onSelect={() => { setSelectedTiming(0); }} />
                            <SelectionModule text='5 mins before' selected={selectedTiming == 1} onSelect={() => { setSelectedTiming(1); }} />
                            <SelectionModule text='15 mins before' selected={selectedTiming == 2} onSelect={() => { setSelectedTiming(2); }} />
                            <SelectionModule text='30 mins before' selected={selectedTiming == 3} onSelect={() => { setSelectedTiming(3); }} />
                        </View>
                    </View>
                    <View className='flex-1' />
                    <Pressable onPress={() => {router.back()}} className='rounded-xl bg-[#137FEC] items-center justify-center p-4 flex flex-row gap-4'>
                        <AppText className='text-[#FFFFFF] leading-[18px] text-[16px] text-fix font-lexend-7'>Save Preferences</AppText>
                    </Pressable>
                </View>
            </ScrollView>
        </PageLayout>
    );
}

const NotificationSchedule = ({ day, title, time }: { day: string, title: string, time: string }) => {

    const [checked, setChecked] = useState(true);

    const progress = useSharedValue(1);

    useEffect(() => {
        progress.value = withTiming(checked ? 1 : 0, { easing: Easing.out(Easing.exp) });
    }, [checked]);

    const animatedStyleContainer = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(progress.value, [0, 1], ['#D1D5DB', '#137FEC'])
        };
    })

    const animatedStyleBob = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(progress.value, [0, 1], ['#FFFFFF', '#2563EB']),
            width: 18 + 6 * progress.value,
            height: 18 + 6 * progress.value,
            left: -26 * (1 - progress.value)
        };
    })


    return (
        <View className='flex flex-row h-20 p-4 gap-4'>
            <View style={{display: 'flex', borderRadius: 8, backgroundColor: subjectColorSecondary, width: 48, height: 48, alignItems: 'center', justifyContent: 'center'}}>
                <AppText style={{fontSize: 12, fontFamily: 'Lexend-Bold', color: subjectColorPrimary}}> {day}</AppText>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <AppText className='text-primary-text font-lexend-6 text-[16px]'>{title}</AppText>
                <AppText className='text-secondary-text font-lexend-4 text-sm'>{time}</AppText>
            </View>
            <View className='flex-1' />
            <View className='flex items-center justify-center'>
                <Pressable onPress={() => { setChecked(!checked) }}>
                    <Animated.View style={[{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: 48, height: 24, borderRadius: 12, alignItems: 'center'}, animatedStyleContainer]}>
                        <Animated.View style={[{borderRadius: 12, alignItems: 'center', justifyContent: 'center'}, animatedStyleBob]}>
                            <MaterialIcons name='check' size={20} color={"#FFFFFF"} />
                        </Animated.View>
                    </Animated.View>
                </Pressable>
            </View>
        </View>
    );
}

const SelectionModule = ({ text, selected, onSelect }: { text: string, selected: boolean, onSelect?: () => void }) => {
    return (
        <Pressable onPress={onSelect} className={`flex flex-row justify-between ${selected ? 'bg-[#F3F9FE] border-blue' : 'border-transparent'} border-2 rounded-lg items-center p-3`}>
            <View>
                <AppText className='text-primary-text text-[16px] text-fix font-lexend-5'>{ text }</AppText>
            </View>
            <View style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: selected ? '#137FEC' : '#D1D5DB' }}>
                <View className='size-2.5 bg-[#FFFFFF] rounded-full' />
            </View>
        </Pressable>
    );
}