import React from "react";
import { Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const PageLayout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <View className='flex-1 bg-page'>
            <SafeAreaView className="flex-1">
                <ScrollView showsVerticalScrollIndicator={Platform.OS == 'web'} className="grow" contentContainerClassName="grow">
                    {children}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}