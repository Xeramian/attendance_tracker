import React from "react";
import { Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const PageLayout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <View className='flex-1 bg-page'>
            <SafeAreaView style={[{flex: 1}]} edges={["top"]}>
                {children}
            </SafeAreaView>
        </View>
    );
}