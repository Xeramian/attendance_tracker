// app/stats/[subjectId].tsx
import { AttendanceHistory } from '@/components/AttendanceHistory';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/PageLayout';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { AttendanceType } from '@/constants/attendance';
import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { LayoutChangeEvent, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler';
import { PanGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture';
import Animated, { clamp, useAnimatedProps, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { runOnRuntime, scheduleOnRN } from 'react-native-worklets';

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function SubjectDetail() {
    const { subjectID } = useLocalSearchParams<{ subjectID: string }>();

    const target = useSharedValue(75);
    const context = useSharedValue(0); // Memory for where the drag started
    const width = useSharedValue(0); // Memory for where the drag started
    // const widthText = useSharedValue(0); // Memory for where the drag started

    const [targetValue, setTargetValue] = useState(target.value);

    const pan = Gesture.Pan()
        .onStart((event) => {
            context.value = target.value;
        })
        .onUpdate((event) => {
            target.value = clamp(context.value + 100*(event.translationX / width.value), 0, 100);
            scheduleOnRN(() => {
                setTargetValue(Math.round(target.value));
            })
        })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            right: `${100-target.value}%`
        };
    });

    // const animatedTextInputProp = useAnimatedProps(() => {
    //     return {
    //         value: `${target.value}%`
    //     }
    // })

    const onLayout = (event: LayoutChangeEvent) => {
        width.value = event.nativeEvent.layout.width;
        console.log(event.nativeEvent.layout.width);
    };

    // const onLayoutText = (event: LayoutChangeEvent) => {
    //     widthText.value = event.nativeEvent.layout.width;
    // };
    
    return (
        <PageLayout>
            <Header heading={"Set Target"} centerHeading={true} leftActions={[{icon: "chevron-left", fn: () => { router.back() }}]} />
            <View className='flex flex-col py-4 gap-4 px-12'>
                <View className='flex flex-row gap-1 justify-center p-4'>
                    <Text className='text-primary-text text-3xl text-fix font-lexend-7'>Target Attendance</Text>
                </View>
                <View className='flex flex-row gap-1 justify-center p-4'>
                    <View className='flex-row'>
                        <Text className='text-primary-text text-7xl text-fix font-lexend-7'>{targetValue}%</Text>
                    </View>
                </View>
                <View onLayout={onLayout} className='self-stretch h-2 relative rounded-full items-center justify-center'>
                    <View className='absolute inset-0 bg-[#DBE0E6] rounded-full' />
                    <Animated.View style={[{ backgroundColor: '#137FEC', position: 'absolute', inset: 0, borderRadius: 4 }, animatedStyle]} />
                    <GestureDetector gesture={pan}>
                        <Animated.View style={[{ backgroundColor: '#FFFFFF', alignSelf: 'center', transform: [{ translateX: '50%' }], borderWidth: 4, borderColor: '#137FEC', position: 'absolute', width: 32, height: 32, borderRadius: 16 }, animatedStyle]} />
                    </GestureDetector>
                </View>
                <View className='flex flex-row items-center justify-between'>
                    <Text className='text-fix font-lexend-5 font-[14px] text-secondary-text w-12 text-center -translate-x-6'>0%</Text>
                    <Text className='text-fix font-lexend-5 font-[14px] text-secondary-text w-12 text-center -translate-x-4'>25%</Text>
                    <Text className='text-fix font-lexend-5 font-[14px] text-secondary-text w-12 text-center'>50%</Text>
                    <Text className='text-fix font-lexend-5 font-[14px] text-secondary-text w-12 text-center translate-x-4'>75%</Text>
                    <Text className='text-fix font-lexend-5 font-[14px] text-secondary-text w-12 text-center translate-x-6'>100%</Text>
                </View>
            </View>
            <View className='py-8 rounded-xl bg-[#FFFFFF] p-4 flex flex-row gap-4 m-8'>
                <View className='rounded-lg size-10 items-center justify-center bg-blue-background'>
                    <MaterialIcons name="info" size={24} color={colors.blue} />
                </View>
                <View className='flex flex-col flex-1'>
                    <Text className='text-primary-text leading-[18px] text-[16px] text-fix font-lexend-7'>How this works</Text>
                    <Text className='font-lexend-4 text-fix font-[14px] text-secondary-text'>This threshold determines when you receive 'At Risk' alerts. Set this to your university's minimum requirement.</Text>
                </View>
            </View>
            <View className='flex-1' />
            <Pressable onPress={() => {router.back()}} className='py-8 rounded-xl bg-[#137FEC] items-center justify-center p-4 flex flex-row gap-4 m-8'>
                <Text className='text-[#FFFFFF] leading-[18px] text-[16px] text-fix font-lexend-7'>Save Preferences</Text>
            </Pressable>
        </PageLayout>
    );
}