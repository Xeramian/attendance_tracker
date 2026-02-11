import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { SettingsTile } from "./SettingsTile";
import { AppText } from "./AppText";
import { router } from "expo-router";

export const AcademicSettings = () => {
    return (
        <View className="mx-4 flex-col items-start gap-2">
            <AppText className='text-secondary-text leading-[16px] text-sm text-fix font-lexend-6 select-none'>Academic Settings</AppText>
            <View className="self-stretch flex-col rounded-xl border-light-border border-2 bg-interactive">
                <Pressable onPress={() => { router.push('/manage-subjects') }}>
                    <SettingsTile icon="library-books"  primaryColor={"#0D9488"} secondaryColor={"#F0FDFA"} value="Manage Subjects" />
                </Pressable>
                {/* <Pressable onPress={() => { router.push('/manage-notifications') }}>
                    <SettingsTile icon="notifications"  primaryColor={"#DB2777"} secondaryColor={"#FDF2F8"} value="Notifications" />
                </Pressable> */}
                <Pressable onPress={() => { router.push('/attendanceConfig/') }}>
                    <SettingsTile icon="analytics"  primaryColor={"#EA580C"} secondaryColor={"#FFF7ED"} value="Attendance Treshold" />
                </Pressable>
            </View>
        </View>
    );
}