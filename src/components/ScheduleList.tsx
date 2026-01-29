import { Ref, RefObject, useEffect, useRef, useState } from "react";
import { Platform, Pressable, View } from "react-native";
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
            console.log(event.translationY);
            const shouldSnapUp = event.velocityY < 0;
            translateY.value = withSpring(shouldSnapUp ? -(maximumTopDisplacement??0) : 0);
        })

    return (
        <GestureDetector gesture={panGesture}>
        <Animated.View className='min-h-screen bg-amber-200 flex flex-col items-strech justify-start' style={[animatedStyles, Platform.OS === 'web' && ({ touchAction: 'none', willChange: 'transform', userSelect: 'none' } as any)]}>
            <Pressable  className="self-center w-40 flex flex-row items-center justify-center">
                <View className="size-20 bg-amber-500">

                </View>
            </Pressable>
        </Animated.View>
        </GestureDetector>
    );
}