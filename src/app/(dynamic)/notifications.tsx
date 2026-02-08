import { AppText } from "@/components/AppText";
import { Header } from "@/components/Header";
import { PageLayout } from "@/components/PageLayout"
import { colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Platform, ScrollView, View } from "react-native";

export default function notificationsScreen() {
    return (
        <PageLayout>
            <Header centerHeading={true} heading="Notifications" leftActions={[{icon: 'chevron-left', fn: () => { router.back(); }}]} />
            <ScrollView showsVerticalScrollIndicator={Platform.OS == 'web'} className="grow" contentContainerClassName="grow">
                <View className="p-4 flex flex-col gap-6">
                    <View className="flex flex-col gap-4">
                        <View className="self-start h-4">
                            <AppText className="font-lexend-7 text-fix text-xs text-secondary-text">Today</AppText>
                        </View>
                        <Notification />
                        <Notification />
                        <Notification />
                    </View>
                    <View className="flex flex-col gap-4">
                        <View className="self-start h-4">
                            <AppText className="font-lexend-7 text-fix text-xs text-secondary-text">Today</AppText>
                        </View>
                        <Notification />
                        <Notification />
                        <Notification />
                    </View>
                </View>
            </ScrollView>
        </PageLayout>
    );
}

const Notification = () => {
    return (
        <View className="self-stretch flex flex-row border-2 rounded-xl border-light-border p-4 bg-[#FFFFFF] gap-4">
            <View className="flex items-center justify-center bg-red-background rounded-full size-10">
                <MaterialIcons name="warning" color={colors.red} size={20} />
            </View>
            <View className="flex flex-col gap-4 flex-1">
                <AppText className="font-lexend-7 text-fix text-sm text-primary-text">Low Attendance Alert</AppText>
                <AppText className="font-lexend-4 text-fix text-sm text-quaternary-text">Your attendance in <AppText className="font-lexend-7 text-fix text-sm text-primary-text">Adanced Calculus</AppText>has dropped below <AppText className="font-lexend-7 text-fix text-sm text-primary-text">75%</AppText></AppText>
                <View className="flex items-center justify-center rounded-lg h-10 bg-red-background mt-4">
                    <AppText className="font-lexend-6 text-fix text-sm text-red">View Subject Details</AppText>
                </View>
            </View>
        </View>
    );
}