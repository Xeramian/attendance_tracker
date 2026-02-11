import { Header } from '@/components/Header';
import { ItemSelector } from '@/components/ItemSelector';
import { PageLayout } from '@/components/PageLayout';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { SubjectBreakdown } from '@/components/SubjectBreakdown';
import { actions } from '@/constants/actions';
import { colors } from '@/constants/colors';
import { Platform, ScrollView, View } from 'react-native';

export default function StatsScreen() {
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
                <SubjectBreakdown subjects={[
                    {"name": "Physics 101", "color": colors.orange, "bg_color": colors.orange_background, attended_no_classes: 25, total_no_classes: 50, pass_critertia: 60, icon: "science"},
                    {"name": "Mathematics 101", "color": colors.green, "bg_color": colors.green_background, attended_no_classes: 37, total_no_classes: 40, pass_critertia: 60, icon: "pie-chart"},
                    {"name": "Physics 101", "color": colors.orange, "bg_color": colors.orange_background, attended_no_classes: 28, total_no_classes: 50, pass_critertia: 60, icon: "science"},
                    {"name": "Physics 101", "color": colors.orange, "bg_color": colors.orange_background, attended_no_classes: 28, total_no_classes: 50, pass_critertia: 60, icon: "science"},
                    {"name": "Physics 101", "color": colors.orange, "bg_color": colors.orange_background, attended_no_classes: 28, total_no_classes: 50, pass_critertia: 60, icon: "science"},
                ]} />
            </ScrollView>
        </PageLayout>

    );
}