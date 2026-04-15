import { AppText } from "@/components/AppText";
import { Header } from "@/components/Header";
import { PageLayout } from "@/components/PageLayout";
import { actions } from "@/constants/actions";
import { colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ColorValue, Modal, Platform, Pressable, ScrollView, TextInput, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { clamp, Easing, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useSubjectStore } from "@/store/SubjectStore";

const DAYS = [
    { label: "MON", value: 1 },
    { label: "TUE", value: 2 },
    { label: "WED", value: 3 },
    { label: "THU", value: 4 },
    { label: "FRI", value: 5 },
    { label: "SAT", value: 6 },
    { label: "SUN", value: 7 },
]

const subject_colors = [
    colors.subject_blue,
    colors.subject_green,
    colors.subject_purple,
    colors.subject_orange,
    colors.subject_pink,
    colors.subject_gray,
];

export default function ManageSubjectsScreen() {

    const subjects = useSubjectStore(({subjects}) => subjects);

    const [createSubject, setCreateSubject] = useState(false);

    const [selectedColor, setSelectedColor] = useState(-1);

    const [classTimings, setClassTimings] = useState<Array<{ day: number | null, startTime: Date | null, endTime: Date | null }>>([{day: null, startTime: null, endTime: null}]);

    const [showPicker, setShowPicker] = useState(false);
    const [pickerStep, setPickerStep] = useState<'startTime' | 'endTime'>('startTime');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [tempStartTime, setTempStartTime] = useState(new Date(0));

    const bottomPadding = useSafeAreaInsets().bottom;

    const { height } = useWindowDimensions();
    
    const context = useSharedValue(0);
    const translateY = useSharedValue(0);
    const open = useSharedValue(0);

    const maximumTopDisplacement = height - 670 - bottomPadding;

    useEffect(() => {
        if (createSubject) {
            translateY.value = 0;
        }
        open.value = withTiming(createSubject ? 380 : 0)
    }, [createSubject]);

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
                scheduleOnRN(setCreateSubject, false);
            } else {
                translateY.value = withSpring(shouldSnapUp ? -(maximumTopDisplacement??0) : 0);
            }
        })


    const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
        if (editingIndex == null || event.type == 'dismissed') {
            setShowPicker(false);
            setPickerStep('startTime');
            return;
        }

        if (date != null) {

            if (pickerStep == 'startTime') {
                setTempStartTime(date);
                setPickerStep('endTime');
            } else {
                setClassTimings((classTimings) => {

                    if (date < tempStartTime) return classTimings;
                    const newClassTimings = [...classTimings];
                    newClassTimings[editingIndex].startTime = tempStartTime;
                    newClassTimings[editingIndex].endTime = date;
                    return newClassTimings;
                })
                setShowPicker(false);
                setPickerStep('startTime');
            }

        }

    }

    return (
        <PageLayout>
            {
                showPicker &&
                <>
                    <Pressable 
                        style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            backgroundColor: 'transparent', // Change to 'rgba(0,0,0,0.05)' to test visually
                            zIndex: 999 
                        }} 
                    />
                    <DateTimePicker
                        key={`${editingIndex}-${pickerStep}`} // Unique key
                        onChange={handleTimeChange}
                        mode="time"
                        is24Hour={true}
                        value={new Date(2026, 0, 0)}
                    />
                </>
            }
            <Modal onRequestClose={() => {setCreateSubject(false);}} animationType="fade" transparent={true} visible={createSubject} statusBarTranslucent={true}>
                <GestureHandlerRootView>
                    <View style={{flex: 1, display: "flex", flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', backgroundColor: "#1F29374C"}}>
                        <View style={{backgroundColor: '#F7F8F9', borderRadius: 16, paddingBottom: bottomPadding}}>
                            <View style={[{display: "flex", flexDirection: "column", backgroundColor: '#f7f8f9', borderTopRightRadius: 16, borderTopLeftRadius: 16, borderColor: '#F3F4F6', borderTopWidth: 2}]}>
                                <GestureDetector gesture={panGesture}>
                                    <View className="bg-[#FFFFFF] border-b-2 border-light-border rounded-t-2xl flex flex-col gap-4 py-4">
                                        <View className="w-20 h-2 rounded-full bg-page-offset self-center" />
                                        <AppText className="font-lexend-7 text-xl text-center text-primary-text">Create Subject</AppText>
                                    </View>
                                </GestureDetector>
                                <Animated.View style={animatedStyle}>
                                    <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={animatedStyle}>
                                        <View style={[{ padding: 16, display: "flex", flexDirection: 'column', gap: 16 }]}>
                                            <View className="bg-[#FFFFFF] rounded-xl p-4 gap-4">
                                                <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-[#9CA3AF]">GENERAL INFO</AppText>
                                                <View />
                                                <View className="flex flex-col gap-1">
                                                    <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-secondary-text">Subject Name</AppText>
                                                    <TextInput placeholder="e.g. Mathemathics 101" placeholderTextColor={"#88898B"} style={{ paddingVertical: 12, paddingHorizontal: 16, color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }} underlineColorAndroid={"transparent"} />
                                                </View>
                                                <View className="flex flex-col gap-1">
                                                    <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-secondary-text">Venue</AppText>
                                                    <TextInput placeholder="e.g. Lecture Hall 4" placeholderTextColor={"#88898B"} style={{ paddingVertical: 12, paddingHorizontal: 16, color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }} underlineColorAndroid={"transparent"} />
                                                </View>
                                            </View>
                                            <View className="bg-[#FFFFFF] rounded-xl p-4 gap-4">
                                                <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-[#9CA3AF]">VISUALS</AppText>
                                                <View />
                                                <View className="flex flex-col gap-3">
                                                    <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-secondary-text">Color Code</AppText>
                                                    <View className="flex flex-row justify-between">
                                                        {
                                                            subject_colors.map((color, index) => {
                                                                return (
                                                                    <Pressable hitSlop={6} key={index} onPress={() => setSelectedColor(index)} className="relative h-10">
                                                                        {
                                                                            selectedColor == index && <>
                                                                                <View style={{ width: 40, height: 40, backgroundColor: color, borderRadius: 20, position: 'absolute' }} />
                                                                                <View style={{ width: 36, height: 36, backgroundColor: "#FFFFFF", borderRadius: 18, position: 'absolute', inset: 2 }} />
                                                                            </>
                                                                        }
                                                                        <View style={{ width: 32, height: 32, backgroundColor: color, borderRadius: 16, inset: 4 }} />
                                                                    </Pressable>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                            <View className="bg-[#FFFFFF] rounded-xl p-4 gap-2">
                                                <View className="flex flex-row justify-between">
                                                    <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-[#9CA3AF]">CLASS TIMINGS</AppText>
                                                    <Pressable onPress={() => { setClassTimings([...classTimings, {day: null, startTime: null, endTime: null}]) }} className="flex flex-row justify-between items-center">
                                                        <MaterialIcons name="add-circle" color={colors.blue} size={16} />
                                                        <AppText className="font-lexend-5 text-sm text-fix text-center text-blue"> Add Slot</AppText>
                                                    </Pressable>
                                                </View>
                                                {
                                                    classTimings.length > 0 &&
                                                    <>
                                                        <View />
                                                        <View className="flex flex-col gap-4">
                                                            {
                                                                classTimings.map(({ day, startTime, endTime }, index) => {
                                                                    return (
                                                                        <View key={index} className="flex flex-row gap-4">
                                                                            <Dropdown
                                                                                data={DAYS}
                                                                                labelField={"label"}
                                                                                valueField={"value"}
                                                                                value={ day }
                                                                                placeholder="Day"
                                                                                dropdownPosition="top"
                                                                                onChange={() => {}}
                                                                                showsVerticalScrollIndicator={Platform.OS=='web'}
                                                                                style={{ width: 96, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }}
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
                                                                            <Pressable onPress={() => { setEditingIndex(index); setShowPicker(true); }} style={{ flex: 4, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }}>
                                                                                {
                                                                                    startTime != null && endTime != null &&
                                                                                    <AppText style={{ color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14 }} >{`${startTime.getHours() % 12}:${startTime.getMinutes().toString().padStart(2, '0')} ${startTime.getHours() < 12 ? 'AM' : 'PM'}`} - {`${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, '0')} ${endTime.getHours() < 12 ? 'AM' : 'PM'}`}</AppText>
                                                                                }
                                                                            </Pressable>
                                                                            <Pressable onPress={() => { setClassTimings([...classTimings.slice(0, index), ...classTimings.slice(index+1)]) }} className="w-6 items-center justify-center">
                                                                                <MaterialIcons name="remove-circle-outline" size={20} color={"#9CA3AF"} />
                                                                            </Pressable>
                                                                        </View>
                                                                    );
                                                                })
                                                            }
                                                        </View>
                                                    </>
                                                }
                                            </View>
                                        </View>
                                    </Animated.ScrollView>
                                </Animated.View>
                            </View>
                            <View className="flex flex-col mt-4 gap-1.5 px-8">
                                <Pressable>
                                    <View className="rounded-xl bg-[#137FEC] h-12 items-center justify-center">
                                        <AppText className="font-lexend-5 text-[16px] text-center text-[#FFFFFF]">Create Subject</AppText>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => setCreateSubject(false)}>
                                    <View className="rounded-xl h-12 items-center justify-center">
                                        <AppText className="font-lexend-5 text-[16px] text-center text-[#6B7280]">Cancel</AppText>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </GestureHandlerRootView>
            </Modal>
            <Header heading="Manage Subjects" centerHeading={true} leftActions={[actions.back]} />
            <ScrollView showsVerticalScrollIndicator={Platform.OS == 'web'} className="grow" contentContainerClassName="grow">
                <View className="p-4 flex flex-col gap-4">
                    <View className="bg-[#FFFFFF] rounded-full flex flex-row items-center gap-2 px-3 py-1.5 self-center">
                        <MaterialIcons name="touch-app" size={14} color={"#617589"} />
                        <AppText className="font-lexend-5 text-secondary-text text-xs">Swipe cards to manage</AppText>
                        <MaterialIcons name="swap-horiz" size={14} color={"#617589"} />
                    </View>
                    <View className="flex flex-col gap-2">
                        {
                            subjects.map(({ title, venue, code, prof, weeklySchedule, color, bg }, index) => 
                                <ManageSubject
                                    key={index}
                                    name={title}
                                    venue={venue}
                                    code={code}
                                    prof={prof}
                                    schedule={weeklySchedule.schedule}
                                    primaryColor={color}
                                    secondaryColor={bg}
                                />
                            )
                        }
                        {/* <ManageSubject 
                            code="EE210" 
                            subject="Signals and Systems" 
                            prof="Prof. Tony Jacob" 
                            venue="L2, LHC" 
                            secondaryColor="#EFF6FF" 
                            primaryColor="#2563EB" 
                        />
                        <ManageSubject 
                            code="EE204" 
                            subject="Digital Design" 
                            prof="Prof. R. Bhattacharjee" 
                            venue="5G1, Core 5" 
                            secondaryColor="#F0FDF4" 
                            primaryColor="#16A34A" 
                        />
                        <ManageSubject 
                            code="EE202" 
                            subject="Analog Circuits" 
                            prof="Prof. S. Majumdar" 
                            venue="L3, LHC" 
                            secondaryColor="#FAF5FF" 
                            primaryColor="#9333EA" 
                        />
                        <ManageSubject 
                            code="HS224" 
                            subject="Psychology" 
                            prof="Prof. P. Naveen" 
                            venue="1201, Core 1" 
                            secondaryColor="#FFF7ED" 
                            primaryColor="#EA580C" 
                        />
                        <ManageSubject 
                            code="EE206" 
                            subject="Microprocessors" 
                            prof="Prof. K. Mohanty" 
                            venue="5004, Core 5" 
                            secondaryColor="#FDF2F8" 
                            primaryColor="#DB2777" 
                        /> */}
                    </View>
                </View>
            </ScrollView>
            <Pressable onPress={() => {setCreateSubject(true);}} className="absolute bottom-6 right-6 size-14 rounded-full bg-[#137FEC] items-center justify-center drop-shadow-2xl">
                <MaterialIcons name="add" size={32} color={"#FFFFFF"} />
            </Pressable>
        </PageLayout>
    );
}

const ManageSubject = ({ name, code, venue, prof, schedule, primaryColor, secondaryColor }: { name: string, code: string, venue: string, prof: string, schedule: Array<{ day: number, startTime: Date, endTime: Date }>, primaryColor: ColorValue, secondaryColor: ColorValue }) => {

    const [subjectState, setSubjectState] = useState(0);

    const translateX = useSharedValue(0);
    const context2 = useSharedValue(0);

    const swipeGesture = Gesture.Pan()
        .activeOffsetX([-16, 16])
        .onStart(() => {
            context2.value = translateX.value;
        })
        .onUpdate((event) => {
            translateX.value = clamp(context2.value + event.translationX, -140, 140);
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

    const [selectedColor, setSelectedColor] = useState(-1);

    const [classTimings, setClassTimings] = useState<Array<{ day: number | null, startTime: Date | null, endTime: Date | null }>>([...schedule]);

    const [showPicker, setShowPicker] = useState(false);
    const [pickerStep, setPickerStep] = useState<'startTime' | 'endTime'>('startTime');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [tempStartTime, setTempStartTime] = useState(new Date(0));

    
    const bottomPadding = useSafeAreaInsets().bottom;

    const { height } = useWindowDimensions();
    
    const context = useSharedValue(0);
    const translateY = useSharedValue(0);
    const open = useSharedValue(0);

    const maximumTopDisplacement = height - 670 - bottomPadding;

    useEffect(() => {
        if (subjectState != 0) {
            translateY.value = 0;
        }
        open.value = withTiming(subjectState == 2 ? 380 : 0)
    }, [subjectState]);

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
                scheduleOnRN(setSubjectState, 0);
            } else {
                translateY.value = withSpring(shouldSnapUp ? -(maximumTopDisplacement??0) : 0);
            }
        })

    const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
        if (editingIndex == null || event.type == 'dismissed') {
            setShowPicker(false);
            setPickerStep('startTime');
            return;
        }

        if (date != null) {

            if (pickerStep == 'startTime') {
                setTempStartTime(date);
                setPickerStep('endTime');
            } else {
                setClassTimings((classTimings) => {

                    if (date < tempStartTime) return classTimings;
                    const newClassTimings = [...classTimings];
                    newClassTimings[editingIndex].startTime = tempStartTime;
                    newClassTimings[editingIndex].endTime = date;
                    return newClassTimings;
                })
                setShowPicker(false);
                setPickerStep('startTime');
            }

        }

    }


    return (
        <View className="relative">
            {
                showPicker &&
                <>
                    <Pressable 
                        style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            backgroundColor: 'transparent', // Change to 'rgba(0,0,0,0.05)' to test visually
                            zIndex: 999 
                        }} 
                    />
                    <DateTimePicker
                        key={`${editingIndex}-${pickerStep}`} // Unique key
                        onChange={handleTimeChange}
                        mode="time"
                        is24Hour={true}
                        value={new Date(2026, 0, 0)}
                    />
                </>
            }
            <Modal onRequestClose={() => {setSubjectState(0);}} transparent={true} animationType="fade" visible={subjectState == 1}>
                <View className="flex-1 items-center justify-center bg-gray-800/30">
                    <View className="bg-[#FFFFFF] rounded-xl flex flex-col w-80 p-6 gap-6">
                        <AppText className="font-lexend-7 text-xl text-center text-primary-text">Remove Subject?</AppText>
                        <AppText className="font-lexend-4 text-sm text-center text-secondary-text">Are you sure you want to remove <AppText className="font-lexend-6 text-sm text-primary-text">Algorithms</AppText>? This action cannot be undone.</AppText>
                        <View className="flex flex-row gap-1.5">
                            <Pressable onPress={() => setSubjectState(0)} className="flex-1">
                                <View className="rounded-xl bg-light-border h-10 items-center justify-center">
                                    <AppText className="font-lexend-5 text-[16px] text-center text-[#374151]">Cancel</AppText>
                                </View>
                            </Pressable>
                            <Pressable className="flex-1">
                                <View className="rounded-xl bg-red h-10 items-center justify-center">
                                    <AppText className="font-lexend-5 text-[16px] text-center text-[#FFFFFF]">Remove</AppText>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal onRequestClose={() => {setSubjectState(0);}} transparent={true} animationType="fade" visible={subjectState == 2}>
                <GestureHandlerRootView>
                    <View style={{flex: 1, display: "flex", flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', backgroundColor: "#1F29374C"}}>
                        <View style={{backgroundColor: '#F7F8F9', borderRadius: 16, paddingBottom: bottomPadding}}>
                            <View style={[{display: "flex", flexDirection: "column", backgroundColor: '#f7f8f9', borderTopRightRadius: 16, borderTopLeftRadius: 16, borderColor: '#F3F4F6', borderTopWidth: 2}]}>
                                <GestureDetector gesture={panGesture}>
                                    <View className="bg-[#FFFFFF] border-b-2 border-light-border rounded-t-2xl flex flex-col gap-4 py-4">
                                        <View className="w-20 h-2 rounded-full bg-page-offset self-center" />
                                        <AppText className="font-lexend-7 text-xl text-center text-primary-text">Edit Subject</AppText>
                                    </View>
                                </GestureDetector>
                                <Animated.View style={animatedStyle}>
                                    <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={animatedStyle}>
                                        <View style={[{ padding: 16, display: "flex", flexDirection: 'column', gap: 16 }]}>
                                            <View className="bg-[#FFFFFF] rounded-xl p-4 gap-4">
                                                <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-[#9CA3AF]">GENERAL INFO</AppText>
                                                <View />
                                                <View className="flex flex-col gap-1">
                                                    <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-secondary-text">Subject Name</AppText>
                                                    <TextInput defaultValue={name} placeholder="e.g. Mathemathics 101" placeholderTextColor={"#88898B"} style={{ paddingVertical: 12, paddingHorizontal: 16, color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }} underlineColorAndroid={"transparent"} />
                                                </View>
                                                <View className="flex flex-col gap-1">
                                                    <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-secondary-text">Venue</AppText>
                                                    <TextInput defaultValue={venue} placeholder="e.g. Lecture Hall 4" placeholderTextColor={"#88898B"} style={{ paddingVertical: 12, paddingHorizontal: 16, color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }} underlineColorAndroid={"transparent"} />
                                                </View>
                                            </View>
                                            <View className="bg-[#FFFFFF] rounded-xl p-4 gap-4">
                                                <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-[#9CA3AF]">VISUALS</AppText>
                                                <View />
                                                <View className="flex flex-col gap-3">
                                                    <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-secondary-text">Color Code</AppText>
                                                    <View className="flex flex-row justify-between">
                                                        {
                                                            subject_colors.map((color, index) => {
                                                                if ( selectedColor == -1 && primaryColor == color ) setSelectedColor(index);
                                                                return (
                                                                    <Pressable hitSlop={6} key={index} onPress={() => setSelectedColor(index)} className="relative h-10">
                                                                        {
                                                                            selectedColor == index && <>
                                                                                <View style={{ width: 40, height: 40, backgroundColor: color, borderRadius: 20, position: 'absolute' }} />
                                                                                <View style={{ width: 36, height: 36, backgroundColor: "#FFFFFF", borderRadius: 18, position: 'absolute', inset: 2 }} />
                                                                            </>
                                                                        }
                                                                        <View style={{ width: 32, height: 32, backgroundColor: color, borderRadius: 16, inset: 4 }} />
                                                                    </Pressable>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                            <View className="bg-[#FFFFFF] rounded-xl p-4 gap-2">
                                                <View className="flex flex-row justify-between">
                                                    <AppText className="ml-2 self-start font-lexend-6 text-sm text-center text-[#9CA3AF]">CLASS TIMINGS</AppText>
                                                    <Pressable onPress={() => { setClassTimings([...classTimings, {day: null, startTime: null, endTime: null}]) }} className="flex flex-row justify-between items-center">
                                                        <MaterialIcons name="add-circle" color={colors.blue} size={16} />
                                                        <AppText className="font-lexend-5 text-sm text-fix text-center text-blue"> Add Slot</AppText>
                                                    </Pressable>
                                                </View>
                                                {
                                                    classTimings.length > 0 &&
                                                    <>
                                                        <View />
                                                        <View className="flex flex-col gap-4">
                                                            {
                                                                classTimings.map(({ day, startTime, endTime }, index) => {
                                                                    return (
                                                                        <View key={index} className="flex flex-row gap-4">
                                                                            <Dropdown
                                                                                data={DAYS}
                                                                                labelField={"label"}
                                                                                valueField={"value"}
                                                                                value={ day }
                                                                                placeholder="Day"
                                                                                dropdownPosition="top"
                                                                                onChange={() => {}}
                                                                                showsVerticalScrollIndicator={Platform.OS=='web'}
                                                                                style={{ width: 96, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }}
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
                                                                            <Pressable onPress={() => { setEditingIndex(index); setShowPicker(true); }} style={{ flex: 4, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }}>
                                                                                {
                                                                                    startTime != null && endTime != null &&
                                                                                    <AppText style={{ color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14 }} >{`${startTime.getHours() % 12}:${startTime.getMinutes().toString().padStart(2, '0')} ${startTime.getHours() < 12 ? 'AM' : 'PM'}`} - {`${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, '0')} ${endTime.getHours() < 12 ? 'AM' : 'PM'}`}</AppText>
                                                                                }
                                                                            </Pressable>
                                                                            <Pressable onPress={() => { setClassTimings([...classTimings.slice(0, index), ...classTimings.slice(index+1)]) }} className="w-6 items-center justify-center">
                                                                                <MaterialIcons name="remove-circle-outline" size={20} color={"#9CA3AF"} />
                                                                            </Pressable>
                                                                        </View>
                                                                    );
                                                                })
                                                            }
                                                        </View>
                                                    </>
                                                }
                                            </View>
                                        </View>
                                    </Animated.ScrollView>
                                </Animated.View>
                            </View>
                            <View className="flex flex-col mt-4 gap-1.5 px-8">
                                <Pressable>
                                    <View className="rounded-xl bg-[#137FEC] h-12 items-center justify-center">
                                        <AppText className="font-lexend-5 text-[16px] text-center text-[#FFFFFF]">Save Changes</AppText>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => setSubjectState(0)}>
                                    <View className="rounded-xl h-12 items-center justify-center">
                                        <AppText className="font-lexend-5 text-[16px] text-center text-[#6B7280]">Cancel</AppText>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </GestureHandlerRootView>
            </Modal>
            <GestureDetector gesture={swipeGesture}>
                <Animated.View style={[{overflow: 'hidden', backgroundColor: '#FFFFFF', borderRadius: 12, display: "flex", flexDirection: 'column', borderWidth: 1, borderColor: '#F3F4F6', padding: 16, gap: 8}, animatedStyle3]}>
                    <View className="flex flex-row justify-between">
                        <View className="flex flex-col gap-1">
                            <View className="flex flex-row gap-2">
                                <View style={{backgroundColor: secondaryColor, borderRadius: 4, paddingHorizontal: 3, paddingVertical: 2}}>
                                    <AppText style={{ fontFamily: 'Lexend-Bold', fontSize: 12, color: primaryColor }}> {code}</AppText>
                                </View>
                                <View className="items-center">
                                    <AppText className="font-lexend-5 text-[#9CA3AF] text-xs">{venue}</AppText>
                                </View>
                            </View>
                            <View>
                                <AppText className="font-lexend-7 text-primary-text text-lg">{name}</AppText>
                            </View>
                            <View>
                                <AppText className="font-lexend-4 text-secondary-text text-[14px]">{prof}</AppText>
                            </View>
                            {/* <View className="flex flex-row gap-2">
                                <View className="items-center justify-center p-1 rounded-sm bg-green-background">
                                    <AppText className="font-lexend-7 text-xs text-green text-center"> 85%</AppText>
                                </View>
                                <View className="items-center justify-center">
                                    <AppText className="font-lexend-5 text-xs text-secondary-text">22/25 Classes</AppText>
                                </View>
                            </View> */}
                        </View>
                        <View className="flex flex-row">
                            <Pressable style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 20, backgroundColor: secondaryColor}}>
                                <MaterialIcons name="functions" size={24} color={primaryColor} />
                            </Pressable>
                        </View>
                    </View>
                    <View className="self-stretch h-0.5 bg-light-border" />
                    <Pressable onPress={() => { router.push('/notification/ComputerScience') }} className="flex flex-row items-center gap-1.5">
                        <MaterialIcons name="notifications-active" size={18} color={primaryColor} />
                        <AppText style={{ fontFamily: 'Lexend-Medium', fontSize: 14, color: primaryColor }}>3 Alerts Active</AppText>
                        <View className="flex-1" />
                        <MaterialIcons name="chevron-right" color={"#D1D5DB"} size={24} />
                    </Pressable>
                    <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, width: 7, backgroundColor: primaryColor}} />
                </Animated.View>
            </GestureDetector>
            <View className="absolute inset-px rounded-xl overflow-hidden flex flex-row border-px border-light-border -z-1">
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
}

// const ManageSubject = () => {

//     // const [switched, setSwitched] = useState(true);

//     // const progress = useSharedValue(1);

//     // useEffect(() => {
//     //     progress.value = withTiming(switched ? 1 : 0, { easing: Easing.out(Easing.exp) })
//     // }, [switched]);

//     // const animatedStyle1 = useAnimatedStyle(() => {
//     //     return {
//     //         backgroundColor: interpolateColor(
//     //             progress.value,
//     //             [0, 1],
//     //             ['#CBD5E1', colors.blue]
//     //         )
//     //     };
//     // })
    
//     // const animatedStyle2 = useAnimatedStyle(() => {
//     //     return {
//     //         transform: [{translateX: progress.value * 12}]
//     //     };
//     // })

//     const [subjectState, setSubjectState] = useState(0);

//     const translateX = useSharedValue(0);
//     const context = useSharedValue(0);

//     const deleteGesture = Gesture.Pan()
//         .onStart(() => {
//             context.value = translateX.value;
//         })
//         .onUpdate((event) => {
//             translateX.value = clamp(context.value + event.translationX, -140, 0);
//         })
//         .onEnd(() => {
//             if (translateX.value < -120) {
//                 scheduleOnRN(setSubjectState, 1);
//             }
//             translateX.value = withSpring(0);
//         })

//     const animatedStyle3 = useAnimatedStyle(() => {
//         return {
//             transform: [{ translateX: translateX.value }]
//         };
//     })


//     return (
//         <View className="relative">
//             <Modal onRequestClose={() => {setSubjectState(0);}} transparent={true} animationType="fade" visible={subjectState == 1}>
//                 <View className="flex-1 items-center justify-center bg-gray-800/30">
//                     <View className="bg-[#FFFFFF] rounded-xl flex flex-col w-80 p-6 gap-6">
//                         <AppText className="font-lexend-7 text-xl text-center text-primary-text">Remove Subject?</AppText>
//                         <AppText className="font-lexend-4 text-sm text-center text-secondary-text">Are you sure you want to remove <AppText className="font-lexend-6 text-sm text-primary-text">Algorithms</AppText>? This action cannot be undone.</AppText>
//                         <View className="flex flex-row gap-1.5">
//                             <Pressable onPress={() => setSubjectState(0)} className="flex-1">
//                                 <View className="rounded-xl bg-light-border h-10 items-center justify-center">
//                                     <AppText className="font-lexend-5 text-[16px] text-center text-[#374151]">Cancel</AppText>
//                                 </View>
//                             </Pressable>
//                             <Pressable className="flex-1">
//                                 <View className="rounded-xl bg-red h-10 items-center justify-center">
//                                     <AppText className="font-lexend-5 text-[16px] text-center text-[#FFFFFF]">Remove</AppText>
//                                 </View>
//                             </Pressable>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//             <View className="absolute inset-0 bg-red rounded-xl flex flex-row border-px border-light-border p-4 justify-end items-center gap-2">
//                 <AppText className="font-lexend-7 text-[16px] text-[#FFFFFF]">Remove</AppText>
//                 <MaterialIcons name="delete" color={"#FFFFFF"} size={32} />
//             </View>
//             <GestureDetector gesture={deleteGesture}>
//                 <Animated.View style={[{backgroundColor: '#FFFFFF', borderRadius: 10, display: "flex", flexDirection: 'row', borderWidth: 1, borderColor: '#F3F4F6', padding: 16}, animatedStyle3]}>
//                     <View className="flex flex-col gap-2 flex-1">
//                         <View>
//                             <AppText className="font-lexend-7 text-primary-text text-[16px]">Data Structures</AppText>
//                         </View>
//                         <View className="flex flex-row gap-2">
//                             <View className="items-center justify-center p-1 rounded-sm bg-green-background">
//                                 <AppText className="font-lexend-7 text-xs text-green text-center"> 85%</AppText>
//                             </View>
//                             <View className="items-center justify-center">
//                                 <AppText className="font-lexend-5 text-xs text-secondary-text">22/25 Classes</AppText>
//                             </View>
//                         </View>
//                     </View>
//                     {/* <Pressable onPress={() => { setSwitched((switched) => {return !switched;}) }} className="flex items-center justify-center">
//                         <Animated.View style={[{display: 'flex', flexDirection: 'row', borderWidth: 2, borderColor: '#F3F4F6', height: 32, borderRadius: 16, alignSelf: 'center', width: 44, alignItems: 'center', justifyContent: 'flex-start'}, animatedStyle1]}>
//                             <Animated.View style={[{backgroundColor: '#FFFFFF', borderRadius: 12, top: 0, left: 2, bottom: 0, width: 24, height: 24}, animatedStyle2]} />
//                         </Animated.View>
//                     </Pressable> */}
//                 </Animated.View>
//             </GestureDetector>
//         </View>
//     );
// }