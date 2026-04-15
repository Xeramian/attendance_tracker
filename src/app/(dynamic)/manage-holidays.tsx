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
import { ColorValue, LayoutChangeEvent, Modal, Platform, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { PanGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture';
import Animated, { Easing, clamp, interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { actions } from '@/constants/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';

const subjectColorPrimary = '#2563EB';
const subjectColorSecondary = '#EFF6FF';

const DAYS = [
    { label: "MON", value: 1 },
    { label: "TUE", value: 2 },
    { label: "WED", value: 3 },
    { label: "THU", value: 4 },
    { label: "FRI", value: 5 },
    { label: "SAT", value: 6 },
    { label: "SUN", value: 7 },
]

const vacationsIcons = [
    {bg: 'bg-[#137FEC]', border: 'border-[#137FEC]', icon: "ac-unit", iconColor: "#FFFFFF"},
    {bg: 'bg-[#FFEDD5]', border: 'border-[#EA580C]', icon: "forest", iconColor: "#EA580C"},
    {bg: 'bg-[#FEF9C3]', border: 'border-[#CA8A04]', icon: "sunny", iconColor: "#CA8A04"},
    {bg: 'bg-[#FEE2E2]', border: 'border-[#DC2626]', icon: "school", iconColor: "#DC2626"},
    {bg: 'bg-[#F3E8FF]', border: 'border-[#9333EA]', icon: "flight-takeoff", iconColor: "#9333EA"},
] satisfies Array<{bg: string, border: string, icon: MaterialIconName, iconColor: ColorValue}>;

const HollidayCard = ({ title, time }: { day: number, title: string, time: string }) => {
    
    const [subjectState, setSubjectState] = useState(0);

    const translateX = useSharedValue(0);
    const context = useSharedValue(0);

    const swipeGesture = Gesture.Pan()
        .activeOffsetX([-16, 16])
        .onStart(() => {
            context.value = translateX.value;
        })
        .onUpdate((event) => {
            translateX.value = clamp(context.value + event.translationX, -140, 140);
        })
        .onEnd(() => {
            if (translateX.value < -110) {
                scheduleOnRN(setSubjectState, 1);
            }
            if (translateX.value > 110) {
                scheduleOnRN(setSubjectState, 2);
            }
            translateX.value = withSpring(0);
        })

    const animatedStyle3 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        };
    })


    return (
        <View>

            <GestureDetector gesture={swipeGesture}>
                <Animated.View style={[{display: 'flex', flexDirection: 'row', height: 96, padding: 24, gap: 16, backgroundColor: '#FFFFFF'}, animatedStyle3]}>
                    <View style={{display: 'flex', borderRadius: 24, backgroundColor: `#50E3C233`, width: 48, height: 48, alignItems: 'center', justifyContent: 'center'}}>
                        <MaterialIcons name='account-tree' size={24} color={`#50E3C2`} />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <AppText className='text-primary-text font-lexend-6 text-[16px]'>{title}</AppText>
                        <AppText className='text-secondary-text font-lexend-4 text-sm'>{time}</AppText>
                    </View>
                    <View className='flex-1' />
                    <View className='flex items-center justify-center'>

                    </View>
                </Animated.View>
            </GestureDetector>
            <View className="absolute inset-px overflow-hidden flex flex-row border-px border-light-border -z-1">
                <View className="bg-blue flex-1 flex flex-row items-center justify-start p-4 gap-2">
                    <MaterialIcons name="edit" color={"#FFFFFF"} size={32} />
                    <AppText className="font-lexend-7 text-[16px] text-[#FFFFFF]">Edit</AppText>
                </View>
                <View className="bg-red flex-1 flex flex-row items-center justify-end p-4 gap-2">
                    <AppText className="font-lexend-7 text-[16px] text-[#FFFFFF]">Remove</AppText>
                    <MaterialIcons name="delete" color={"#FFFFFF"} size={32} />
                </View>
            </View>
        </View>
    );
};

export default function ManageHolidaysScreen() {
    // const { subjectID } = useLocalSearchParams<{ subjectID: string }>();

    // const [selectedTiming, setSelectedTiming] = useState(0);

    const { height } = useWindowDimensions();

    const bottomPadding = useSafeAreaInsets().bottom;
    
    const context = useSharedValue(0);
    const translateY = useSharedValue(0);
    const open = useSharedValue(0);

    const maximumTopDisplacement = height - 670 - bottomPadding;

    const [createHoliday, setCreateHoliday] = useState(false);

    const [selectedType, setSelectedType] = useState<'Holiday'|'Schedule'>('Holiday');
    const [selectedIcon, setSelectedIcon] = useState(0);
    const [selectedDay, setSelectedDay] = useState(null);


    useEffect(() => {
        open.value = withTiming(createHoliday ? 380 : 0)
        if (!createHoliday) {
            translateY.value = 0;
        }
    }, [createHoliday]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: open.value - translateY.value,
        };
    });

    const panGesture = Gesture.Pan()
        .onStart(() => {
            context.value = translateY.value;
        })
        .onUpdate((event) => {
            translateY.value = clamp(context.value + event.translationY, -(maximumTopDisplacement??0), 300);
        })
        .onEnd((event) => {
            const shouldSnapUp = event.velocityY < 0;
            const shouldEnd = translateY.value > 75;
            if (shouldEnd) {
                // scheduleOnRN(() => {}, false);
            } else {
                translateY.value = withSpring(shouldSnapUp ? -(maximumTopDisplacement??0) : 0);
            }
        })



    return (
        <PageLayout>
            <Modal visible={createHoliday} transparent={true}>
                <GestureHandlerRootView>
                    <View style={{flex: 1, display: "flex", flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', backgroundColor: "#1F29374C"}}>
                        <View style={{backgroundColor: '#F7F8F9', borderRadius: 16, paddingBottom: bottomPadding}}>
                            <View style={[{display: "flex", flexDirection: "column", backgroundColor: '#f7f8f9', borderTopRightRadius: 16, borderTopLeftRadius: 16, borderColor: '#F3F4F6', borderTopWidth: 2}]}>
                                <GestureDetector gesture={panGesture}>
                                    <View className="bg-[#FFFFFF] border-b-2 border-light-border rounded-t-2xl flex flex-col gap-4 py-4">
                                        <View className="w-20 h-2 rounded-full bg-page-offset self-center" />
                                        <AppText className="font-lexend-7 text-xl text-center text-primary-text">Create {selectedType == 'Holiday' ? 'Holiday' : selectedType == 'Schedule' ? 'Schedule Shift' : ''}</AppText>
                                    </View>
                                </GestureDetector>
                                <Animated.View style={animatedStyle}>
                                    <Animated.ScrollView showsVerticalScrollIndicator={Platform.OS == 'web'} contentContainerStyle={animatedStyle}>
                                        <View className="p-4 flex flex-col gap-4">
                                            <View className="bg-page-offset p-1 rounded-lg flex flex-row">
                                                <Pressable onPress={() => { setSelectedType('Holiday') }} className={`flex-1 items-center justify-center p-2 ${selectedType == 'Holiday' ? 'bg-page' : ''} rounded-lg`}>
                                                    <AppText className={`text-sm font-lexend-6 ${selectedType == 'Holiday' ? 'text-subject-blue' : 'text-secondary-text'}`}>Holiday / Vacation</AppText>
                                                </Pressable>
                                                <Pressable onPress={() => { setSelectedType('Schedule') }} className={`flex-1 items-center justify-center p-2 ${selectedType == 'Schedule' ? 'bg-page' : ''} rounded-lg`}>
                                                    <AppText className={`text-sm font-lexend-6 ${ selectedType=='Schedule' ? 'text-subject-blue' : 'text-secondary-text'}`}>Schedule Shift</AppText>
                                                </Pressable>
                                            </View>
                                            {
                                                selectedType == 'Holiday' ? 
                                                <View className="flex flex-col gap-4">
                                                    <View className="bg-[#FFFFFF] rounded-xl p-4 gap-4 flex flex-col">
                                                        <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-[#9CA3AF]">GENERAL INFO</AppText>
                                                        <View />
                                                        <View className="flex flex-col gap-2">
                                                            <AppText className={`ml-2 font-lexend-6 text-secondary-text`}>Holiday Name</AppText>
                                                            <TextInput placeholder="e.g. Winter Break" placeholderTextColor={"#88898B"} style={{ paddingVertical: 12, paddingHorizontal: 16, color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }} underlineColorAndroid={"transparent"} />
                                                        </View>
                                                        <View className="flex flex-row gap-4">
                                                            <View className="flex-1 flex flex-col gap-1">
                                                                <AppText className={`ml-2 font-lexend-6 text-secondary-text`}>Holiday Name</AppText>
                                                                <View style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                    <AppText style={{color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14}}>mm/dd/yyyy</AppText>
                                                                    <MaterialIcons name="calendar-today" color={"#111418"} size={18} />
                                                                </View>
                                                            </View>
                                                            <View className="flex-1 flex flex-col gap-1">
                                                                <AppText className={`ml-2 font-lexend-6 text-secondary-text`}>Holiday Name</AppText>
                                                                <View style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                    <AppText style={{color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14}}>mm/dd/yyyy</AppText>
                                                                    <MaterialIcons name="calendar-today" color={"#111418"} size={18} />
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View className="flex flex-col justify-between items-stretch gap-4">
                                                        <View className="bg-[#FFFFFF] rounded-xl p-4 gap-4 flex flex-col">
                                                            <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-[#9CA3AF]">VISUALS</AppText>
                                                            <View />
                                                            <View className="flex flex-col gap-1 items-start justify-center">
                                                                <AppText className={`ml-2 font-lexend-6 text-secondary-text`}>Icon Style</AppText>
                                                            </View>
                                                            <ScrollView horizontal={true} contentContainerClassName="flex flex-row gap-4" showsHorizontalScrollIndicator={false}>
                                                                {
                                                                    vacationsIcons.map(({ bg, border, icon, iconColor }, index) =>
                                                                        <Pressable onPress={() => {setSelectedIcon(index)}} key={index} className={`size-14 ${selectedIcon == index ? `border-2 ${border}` : ''} items-center justify-center rounded-full`}>
                                                                            <View className={`rounded-full size-12 ${bg} items-center justify-center`}>
                                                                                <MaterialIcons name={icon} color={iconColor} size={24} />
                                                                            </View>
                                                                        </Pressable>
                                                                    )
                                                                }
                                                            </ScrollView>
                                                        </View>
                                                    </View>
                                                </View>
                                                : selectedType == 'Schedule' ?
                                                <View className="flex flex-col gap-4">
                                                    <View className="flex flex-row gap-4">
                                                        <View className="flex-1 bg-[#FFFFFF] rounded-xl p-4 gap-4">
                                                            <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-[#9CA3AF]">GENERAL INFO</AppText>
                                                            <View />
                                                            <View className="flex-1 flex flex-col gap-1">
                                                                <AppText className={`ml-2 font-lexend-6 text-secondary-text`}>DATE</AppText>
                                                                <View style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                    <AppText style={{color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14}}>mm/dd/yyyy</AppText>
                                                                    <MaterialIcons name="calendar-today" color={"#111418"} size={18} />
                                                                </View>
                                                            </View>
                                                            <View className="flex flex-col justify-between items-stretch py-4 gap-1">
                                                                <AppText className={`ml-2 font-lexend-6 text-secondary-text`}>SHIFT DAY</AppText>
                                                                <Dropdown
                                                                    data={DAYS}
                                                                    labelField={"label"}
                                                                    valueField={"value"}
                                                                    value={ selectedDay }
                                                                    placeholder="Select a Day to Mimic"
                                                                    dropdownPosition="top"
                                                                    onChange={(day) => { setSelectedDay(day); }}
                                                                    showsVerticalScrollIndicator={Platform.OS=='web'}
                                                                    style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }}
                                                                    selectedTextStyle={{ color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14 }}
                                                                    placeholderStyle={{
                                                                        color: '#88898B',
                                                                        fontFamily: 'Lexend-Medium',
                                                                        fontSize: 14
                                                                    }}
                                                                    containerStyle={{
                                                                        borderRadius: 12,
                                                                        overflow: 'hidden'
                                                                    }}
                                                                    // itemContainerStyle={{
                                                                    //     backgroundColor: '#'
                                                                    // }}
                                                                    itemTextStyle={{ 
                                                                        color: '#111418', 
                                                                        fontFamily: 'Lexend-Medium', 
                                                                        fontSize: 14 
                                                                    }}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                : <></>
                                            }
                                        </View>
                                    </Animated.ScrollView>
                                </Animated.View>
                            </View>
                            <View className="flex flex-col mt-4 gap-1.5 px-8">
                                <Pressable>
                                    <View className="rounded-xl bg-[#137FEC] h-12 items-center justify-center">
                                        <AppText className="font-lexend-5 text-[16px] text-center text-[#FFFFFF]">Create {selectedType == 'Holiday' ? 'Holiday' : selectedType == 'Schedule' ? 'Schedule Shift' : ''}</AppText>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => setCreateHoliday(false)}>
                                    <View className="rounded-xl h-12 items-center justify-center">
                                        <AppText className="font-lexend-5 text-[16px] text-center text-[#6B7280]">Cancel</AppText>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </GestureHandlerRootView>
            </Modal>
            <Header heading={"Holidays and Break"} centerHeading={true} leftActions={[actions.back]} />
            <ScrollView showsVerticalScrollIndicator={Platform.OS == 'web'} >
                <View className='flex flex-col pt-6 pb-8 px-4 gap-8'>
                    <View style={{ display: 'flex', flexDirection: 'row', borderRadius: 16, backgroundColor: subjectColorPrimary, padding: 24, justifyContent: 'space-between' }}>
                        <View className='flex flex-col gap-2'>
                            <View className='px-2 py-1 flex flex-row rounded-md bg-[#FFFFFF]/20 self-start'>
                                <AppText className='text-[#FFFFFF] text-xs text-fix font-lexend-5'>Next Break</AppText>
                            </View>
                            <View>
                                <AppText className='text-[#FFFFFF] text-2xl text-fix font-lexend-7'>Winter Holidays</AppText>
                            </View>
                            <View className='flex flex-row items-center gap-1'>
                                <MaterialIcons name='calendar-month' color={"#FFFFFF"} size={20} />
                                <AppText className='text-[#FFFFFF] text-[16px] text-fix font-lexend-5'>Dec 20 - Jan 5</AppText>
                            </View>
                            <View className='px-2 py-1 flex flex-row rounded-full bg-[#FFFFFF]/20 self-start gap-1'>
                                <MaterialIcons name='schedule' color={"#FFFFFF"} size={18} />
                                <AppText className='text-[#FFFFFF]/80 text-sm text-fix font-lexend-4'>In 12 days</AppText>
                            </View>
                        </View>
                        <View className='items-center justify-center pr-4'>
                            <MaterialIcons name="snowboarding" size={100} color="#FFFFFF" />
                        </View>
                    </View>
                    <View className='flex flex-col gap-3'>
                        <AppText className='text-primary-text text-lg text-fix font-lexend-7'>Upcoming</AppText>
                        <View className='flex flex-col rounded-xl border-4 border-light-border p-0.5'>
                            <HollidayCard day={20} title='hii' time='123' />
                            <View className='h-0.5 bg-light-border' />
                            <HollidayCard day={20} title='hii' time='123' />
                            <View className='h-0.5 bg-light-border' />
                            <HollidayCard day={20} title='hii' time='123' />
                        </View>
                    </View>
                    <View className='flex flex-col gap-3'>
                        <AppText className='text-secondary-text text-lg text-fix font-lexend-7'>Past</AppText>
                        <View className='flex flex-col rounded-xl border-4 border-light-border p-0.5'>
                            <HollidayCard day={20} title='hii' time='123' />
                            <View className='h-0.5 bg-light-border' />
                            <HollidayCard day={20} title='hii' time='123' />
                            <View className='h-0.5 bg-light-border' />
                            <HollidayCard day={20} title='hii' time='123' />
                        </View>
                    </View>
                    <View className='flex-1' />
                    {/* <Pressable onPress={() => {router.back()}} className='rounded-xl bg-[#137FEC] items-center justify-center p-4 flex flex-row gap-4'>
                        <AppText className='text-[#FFFFFF] leading-[18px] text-[16px] text-fix font-lexend-7'>Save Preferences</AppText>
                    </Pressable> */}
                </View>
            </ScrollView>
            <Pressable onPress={() => {setCreateHoliday(true)}} className="absolute bottom-6 right-6 size-14 rounded-full bg-[#137FEC] items-center justify-center drop-shadow-2xl">
                <MaterialIcons name="add" size={32} color={"#FFFFFF"} />
            </Pressable>
        </PageLayout>
    );
}