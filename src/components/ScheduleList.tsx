import { MaterialIcons } from "@expo/vector-icons";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const ScheduleList = ({maximumTopDisplacement}: {maximumTopDisplacement?: number}) => {

    const context = useSharedValue(0);
    const translateY = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

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
        <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedStyles, { minHeight: '100vh', borderWidth: 2, backgroundColor: '#FFFFFF', borderColor: '#F3F4F6', borderTopLeftRadius: 24, borderTopRightRadius: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }, Platform.OS === 'web' && ({ touchAction: 'none', willChange: 'transform', userSelect: 'none' } as any)]}>
            <View className="flex flex-col pt-3 gap-1 items-stretch h-full">
                <View className="w-12 h-2 rounded-full bg-page-offset self-center" />
                <View className="flex flex-row px-5 py-4 justify-between self-stretch">
                    <View className="flex flex-col gap-0.5">
                        <Text className="text-primary-text text-fix font-lexend-7 leading-[24px] text-xl">Oct 24, Tue</Text>
                        <Text className="text-[#6B7280] text-fix font-lexend-4 leading-[16px] text-sm">3 Classes • 1 Absent</Text>
                    </View>
                    <View className="self-stretch items-center justify-center size-10 bg-ui-accent rounded-full">
                        <MaterialIcons name="calendar-today" size={20} color={'#137FEC'} />
                    </View>
                </View>
                <View className="flex flex-col p-5 gap-4 items-stretch justify-start">
                    <View className="w-full h-16 gap-3 flex flex-row">
                        <View className="flex flex-row gap-4">
                            <View className="w-12 flex flex-col items-center justify-center">
                            <Text className="text-[#6B7280] text-fix font-lexend-6 leading-[14px] text-xs">09:00</Text>
                            </View>
                        </View>
                        <View className="grow border-2 border-light-border flex flex-row items-center p-3 rounded-xl">
                            <View className="flex flex-row flex-1">
                                <View className="flex flex-col">
                                    <Text className="text-primary-text text-fix font-lexend-7 leading-[24px] text-xl">Mathematics</Text>
                                    <Text className="text-[#6B7280] text-fix font-lexend-4 leading-[16px] text-sm">Room 301</Text>
                                </View>
                            </View>
                            <View className="flex flex-row items-center justify-center size-8 rounded-full bg-[#DCFCE7]">
                                <MaterialIcons name="check" size={18} color={'#16A34A'} />
                            </View>
                        </View>
                    </View>
                    <View className="w-full h-16 gap-3 flex flex-row">
                        <View className="flex flex-row gap-4">
                            <View className="w-12 flex flex-col items-center justify-center">
                            <Text className="text-[#6B7280] text-fix font-lexend-6 leading-[14px] text-xs">11:00</Text>
                            </View>
                        </View>
                        <View className="grow border-2 border-light-border flex flex-row items-center p-3 rounded-xl">
                            <View className="flex flex-row flex-1">
                                <View className="flex flex-col">
                                    <Text className="text-primary-text text-fix font-lexend-7 leading-[24px] text-xl">Physics{"\u00A0"}</Text>
                                    <Text className="text-[#6B7280] text-fix font-lexend-4 leading-[16px] text-sm">Room 301</Text>
                                </View>
                            </View>
                            <View className="flex flex-row items-center justify-center size-8 rounded-full bg-[#FEE2E2]">
                                <MaterialIcons name="close" size={18} color={'#DC2626'} />
                            </View>
                        </View>
                    </View>
                    <View className="w-full h-16 gap-3 flex flex-row">
                        <View className="flex flex-row gap-4">
                            <View className="w-12 flex flex-col items-center justify-center">
                            <Text className="text-[#6B7280] text-fix font-lexend-6 leading-[14px] text-xs">02:00</Text>
                            </View>
                        </View>
                        <View className="grow border-2 border-light-border flex flex-row items-center p-3 rounded-xl">
                            <View className="flex flex-row flex-1">
                                <View className="flex flex-col">
                                    <Text className="text-primary-text text-fix font-lexend-7 leading-[24px] text-xl">Literature</Text>
                                    <Text className="text-[#6B7280] text-fix font-lexend-4 leading-[16px] text-sm">Cancelled</Text>
                                </View>
                            </View>
                            <View className="flex flex-row items-center justify-center size-8 rounded-full bg-[#E5E7EB]">
                                <MaterialIcons name="remove" size={18} color={'#6B7280'} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>
        </GestureDetector>
    );
}