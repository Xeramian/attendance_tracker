import { AppText } from '@/components/AppText';
import { MaterialIcons } from "@expo/vector-icons"
import React from 'react';
import { Pressable, View } from "react-native"

export const Header = ({ heading, centerHeading, subheading, leftActions, rightActions }: { heading?: string, centerHeading?: boolean, subheading?: string, leftActions?: Array<{icon: MaterialIconName, fn?: () => void}>, rightActions?: Array<{icon: MaterialIconName|React.ReactElement, fn?: () => void}> }) => {
    return (
        <View className='h-25 p-4 flex flex-row items-center justify-between border-b-2 border-light-border select-none z-1 bg-page'>
            <View className="flex flex-row gap-6">
                { leftActions?.map(({icon, fn}, i) => <Pressable key={i} onPress={() => {fn?.()}}><MaterialIcons name={icon} size={24} color={"#000000"} /></Pressable>) }
            </View>

            <View className={`flex flex-col gap-1 flex-1 -z-1 ${(centerHeading??false)?'absolute inset-0 items-center justify-center':''}`}>
                { heading && <AppText className='text-primary-text text-2xl text-fix font-lexend-7 px-0.5'>{heading}</AppText> }
                { subheading && <AppText className='text-secondary-text leading-[16px] text-sm text-fix font-lexend px-0.5'>{subheading}</AppText> }
            </View>

            <View className="flex flex-row gap-6">
                { rightActions?.map(({icon, fn}, i) =>
                <Pressable hitSlop={20} key={i} onPress={() => {fn?.()}} className='flex flex-row items-center justify-center'>
                    {
                        React.isValidElement(icon) ? 
                            icon
                        :
                            <MaterialIcons name={icon} size={24} color={"#000000"} />
                    }
                </Pressable>) }
            </View>

        </View>
    )
}