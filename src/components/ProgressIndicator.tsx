import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ProgressIndicator = ({ size, progress, topText, bottomText }: { size?: number, progress: number, topText?: string, bottomText?: string }) => {
    // 1. Math Constants
    const radius = 45;
    const circumference = 2 * Math.PI * radius; // ≈ 283

    const progressValue = useSharedValue(0);

    const [isReady, setIsReady] = useState(false);

    useFocusEffect(useCallback(() => {
        setIsReady(false);
        progressValue.value = 0;
        setTimeout(() => setIsReady(true), 0);
    }, []));
    
    useEffect(() => {
        if (!isReady) return;
        progressValue.value = withTiming(progress, {
            duration: 1200,
            easing: Easing.out(Easing.exp),
        });
    }, [progress, isReady]);

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circumference - (progressValue.value / 100) * circumference,
        }
    })

    return (
        <View className="flex relative items-center">
            <View style={{ width: size??240, height: size??240, justifyContent: "center", alignItems: "center" }}>
                <Svg viewBox='0 0 100 100' style={{transform: [{ rotateZ: "180deg" }]}}>
                    {/* Background Track */}
                    <Circle 
                        cx="50" 
                        cy="50" 
                        r={radius} 
                        strokeWidth="8"
                        stroke="#E5E7EB" // Replace with your 'ui-accent' color code
                        fill="transparent" 
                    />
                    
                    {/* Progress Line */}
                    <AnimatedCircle 
                        cx="50" 
                        cy="50" 
                        r={radius} 
                        strokeWidth="8"
                        stroke="#137FEC"
                        fill="transparent"
                        strokeLinecap="round"
                        // 3. React Native SVG props
                        strokeDasharray={circumference}
                        animatedProps={animatedProps}
                    />
                </Svg>
            </View>
            <View className='absolute inset-0 items-center justify-center flex flex-col'>
                <View>
                    <Text className="text-quaternary-text text-fix font-lexend-7 leading-[24px] text-xl">{topText}</Text>
                </View>
                <View>
                    <Text className='text-primary-text text-5xl text-fix font-lexend-7'>{progress}%</Text>
                </View>
                <View>
                    <Text className="text-secondary-text text-fix font-lexend-6 leading-[16px] text-sm">{bottomText}</Text>
                </View>
            </View>
        </View>
    );
}