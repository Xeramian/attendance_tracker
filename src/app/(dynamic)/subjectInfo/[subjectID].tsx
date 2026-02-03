// app/stats/[subjectId].tsx
import { AppText } from '@/components/AppText';
import { AttendanceHistory } from '@/components/AttendanceHistory';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/PageLayout';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { AttendanceType } from '@/constants/attendance';
import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Platform, Pressable, ScrollView, View } from 'react-native';

export default function SubjectDetail() {
    const { subjectID } = useLocalSearchParams<{ subjectID: string }>();
    return (
        <PageLayout>
            <Header heading={subjectID} centerHeading={true} leftActions={[{icon: "chevron-left", fn: () => { router.back() }}]} />
            <ScrollView showsVerticalScrollIndicator={Platform.OS == 'web'} className="grow flex flex-col" contentContainerClassName="grow pb-16">
                <View className='m-4 p-6 gap-6 flex flex-col bg-[#FFFFFF] rounded-xl'>
                    <ProgressIndicator size={180} bottomText={"Attendance"} progress={75} />
                    <Pressable onPress={() => {router.navigate(`/attendanceConfig/${subjectID}`);}} className='bg-blue-background rounded-full flex items-center justify-center flex-row self-center px-4 py-2'>
                        <MaterialIcons name="edit-note" size={20} color={colors.blue} />
                        <AppText className='text-fix font-lexend-7 text-blue text-[14px]'>Target</AppText>
                    </Pressable>
                    <View className='flex flex-row gap-1 justify-center'>
                        <View className='flex flex-col gap-1 items-center w-24'>
                            <AppText className="text-secondary-text text-fix font-lexend-5 leading-[16px] text-sm">TOTAL</AppText>
                            <AppText className='text-primary-text leading-[24px] text-xl text-fix font-lexend-7'>20</AppText>
                        </View>
                        <View className='h-full w-0.5 rounded-full bg-[#F3F4F6]' />
                        <View className='flex flex-col gap-1 items-center w-24'>
                            <AppText className="text-blue text-fix font-lexend-5 leading-[16px] text-sm">ATTENDED</AppText>
                            <AppText className='text-blue leading-[24px] text-xl text-fix font-lexend-7'>17</AppText>
                        </View>
                        <View className='h-full w-0.5 rounded-full bg-[#F3F4F6]' />
                        <View className='flex flex-col gap-1 items-center w-24'>
                            <AppText className="text-red text-fix font-lexend-5 leading-[16px] text-sm">ABSENT</AppText>
                            <AppText className='text-red leading-[24px] text-xl text-fix font-lexend-7'>3</AppText>
                        </View>
                    </View>
                </View>
                <AttendanceHistory attendance={[
                    { time: new Date("2026-02-01T10:00:00"), status: AttendanceType.Present },
                    { time: new Date("2026-02-01T10:00:00"), status: AttendanceType.Absent },
                    { time: new Date("2026-02-01T10:00:00"), status: AttendanceType.Excused },
                ]} />
            </ScrollView>
        </PageLayout>
    );
}