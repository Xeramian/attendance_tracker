import { AppText } from '@/components/AppText';
import { colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ColorValue, View } from "react-native";
import Animated, { GentleSpringConfigWithDuration, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export const SubjectBreakdown = ({ subjects }: { subjects: Array<{ "name": string, "pass_critertia": number, "color": ColorValue, "bg_color": ColorValue, "icon": MaterialIconName, "attended_no_classes": number, "total_no_classes": number }> }) => {
    return (
        <View className="flex flex-col gap-6">
            <View className="flex flex-row justify-between px-4">
                <View>
                    <AppText className="text-primary-text text-fix font-lexend-7 leading-[24px] text-xl">Subject Breakdown{"\u200B"}</AppText>
                </View>
                {/* <View>
                    <AppText className="text-ui text-fix font-lexend-4 leading-[16px] text-sm">View All{"\u200B"}</AppText>
                </View> */}
            </View>
            <View className="gap-4 px-4">
                { subjects.map((subject, index) => <InduvidualSubjectInfo key={index} subject={subject} />) }

                {/* <View className="w-full h-26 bg-[#FFFFFF] rounded-xl p-4 flex flex-col gap-3">
                    <View className="flex flex-row gap-3">
                        <View className="size-10 bg-green-background rounded-lg items-center justify-center">
                            <MaterialIcons name={"functions"} size={24} color={colors.green} />
                        </View>
                        <View className="flex flex-col flex-1">
                            <AppText className="text-primary-text text-fix font-lexend-7 leading-[18px] text-[16px]">Maths 101</AppText>
                            <AppText className="text-secondary-text text-fix font-lexend-4 leading-[14px] text-xs">16/32 Classes</AppText>
                        </View>
                        <View className="self-center px-2.5 py-1 items-center justify-center bg-danger-background rounded-full">
                            <AppText className="text-fix font-lexend-7 leading-[14px] text-xs text-danger">At Risk</AppText>
                        </View>
                    </View>
                    <View className="flex flex-row items-center gap-3 h-5">
                        <View className="flex-1 relative">
                            <View className="absolute inset-0 h-2 bg-page rounded-full" />
                            <View className="absolute inset-0 right-[50%] h-2 bg-green rounded-full" />
                        </View>
                    </View>
                </View> */}
            </View>
        </View>
    );
}

const InduvidualSubjectInfo = ({ subject }: { subject: { "name": string, "pass_critertia": number, "color": ColorValue, "bg_color": ColorValue, "icon": MaterialIconName, "attended_no_classes": number, "total_no_classes": number } }) => {
    const progress = useSharedValue(0);

    const [isReady, setIsReady] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (!isReady) {
                progress.value = 0;
                setIsReady(true);
            }
            setTimeout(() => {
                progress.value = (subject.attended_no_classes / subject.total_no_classes) * 100;
            }, 0);
            return () => progress.value = 0;
        }, [subject])
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(`${progress.value}%`),
        }
    })

    return (
        <View className="w-full h-26 bg-[#FFFFFF] rounded-xl p-4 flex flex-col gap-3">
            <View className="flex flex-row gap-3">
                <View style={{width: 40, height: 40, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: subject.bg_color}}>
                    <MaterialIcons name={subject.icon} size={24} color={subject.color} />
                </View>
                <View className="flex flex-col flex-1">
                    <AppText className="text-primary-text text-fix font-lexend-7 leading-[18px] text-[16px]">{subject.name}{"\u200B"}</AppText>
                    <AppText className="text-secondary-text text-fix font-lexend-4 leading-[14px] text-xs">{subject.attended_no_classes.toString()}/{subject.total_no_classes.toString()} Classes{"\u200B"}</AppText>
                </View>
                { (subject.attended_no_classes / subject.total_no_classes) * 100 >= subject.pass_critertia ? 
                    <View className="self-center px-2.5 py-1 items-center justify-center bg-success-background rounded-full">
                        <AppText className="text-fix font-lexend-7 leading-[14px] text-xs text-success">Safe{"\u200B"}</AppText>
                    </View>
                    :
                    <View className="self-center px-2.5 py-1 items-center justify-center bg-danger-background rounded-full">
                        <AppText className="text-fix font-lexend-7 leading-[14px] text-xs text-danger">At Risk{"\u200B"}</AppText>
                    </View>
                }
            </View>
            <View className="flex flex-row items-center gap-3 h-5">
                <View className="flex-1 relative">
                    <View className="absolute inset-0 h-2 bg-page rounded-full" />
                    <Animated.View
                        style={[{
                            "backgroundColor": subject.color,
                            "borderRadius": 4,
                            "inset": 0,
                            "height": 8,
                        }, animatedStyle]} />
                </View>
                { (subject.attended_no_classes / subject.total_no_classes) * 100 >= subject.pass_critertia ? 
                    <View className="self-center items-center justify-center">
                        <AppText className="text-fix font-lexend-7 leading-[14px] text-xs text-success">{((subject.attended_no_classes / subject.total_no_classes) * 100).toFixed(2)}%{"\u200B"}</AppText>
                    </View>
                    :
                    <View className="self-center items-center justify-center">
                        <AppText className="text-fix font-lexend-7 leading-[14px] text-xs text-danger">{((subject.attended_no_classes / subject.total_no_classes) * 100).toFixed(2)}%{"\u200B"}</AppText>
                    </View>
                }
            </View>
        </View>
    );
}