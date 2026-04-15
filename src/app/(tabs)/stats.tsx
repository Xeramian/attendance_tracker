import { Header } from '@/components/Header';
import { ItemSelector } from '@/components/ItemSelector';
import { PageLayout } from '@/components/PageLayout';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { SubjectBreakdown } from '@/components/SubjectBreakdown';
import { actions } from '@/constants/actions';
import { colors } from '@/constants/colors';
import { useSubjectStore } from '@/store/SubjectStore';
import { ColorValue, Platform, ScrollView, View } from 'react-native';


export default function StatsScreen() {
    const _subjects = useSubjectStore((state) => state.subjects).map(({ title, color, bg, totalClasses, icon }) => ({ title, color, bg, attended_no_classes: totalClasses.length/2, total_no_classes: totalClasses.length, pass_criteria: 75, icon})) satisfies Array<{ title: string, color: ColorValue, bg: ColorValue, attended_no_classes: number, total_no_classes: number, pass_criteria: number, icon: MaterialIconName }>;
    return (
        <PageLayout>
            <Header heading={"Attendance Analytics"} rightActions={[actions.notification]} />
            {/* <View className='p-4'>
                <ItemSelector items={["Weekly", "Monthly"]} onSelect={(item) => {console.log(item)}} />
            </View> */}
            <ScrollView showsVerticalScrollIndicator={Platform.OS == 'web'} className="grow flex flex-col" contentContainerClassName="grow pb-16">
                <View className='p-6 self-center relative'>
                    <ProgressIndicator size={240} topText={"Total"} bottomText={"Attendance"} progress={75} />
                </View>
                <SubjectBreakdown subjects={_subjects} />
            </ScrollView>
        </PageLayout>
    );
}