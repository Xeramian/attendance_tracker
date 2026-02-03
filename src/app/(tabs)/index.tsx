import { AttendanceCard } from '@/components/AttendanceCard';
import { ClassesStatus } from '@/components/ClassesStatus';
import { QuickActions } from '@/components/QuickActions';
import { PageLayout } from '@/components/PageLayout';
import { Platform, ScrollView } from 'react-native';
import { Header } from '@/components/Header';

export default function HomeScreen() {
    return (
        <PageLayout>
            {/* Main Header */}
            <Header heading='Welcome back, Xeramian!' subheading='Computer Science Major' rightActions={["notifications"]} />
            <ScrollView showsVerticalScrollIndicator={Platform.OS == 'web'} className="grow" contentContainerClassName="grow">

                {/* Attendance Card */}
                <AttendanceCard />

                {/* Status */}
                <ClassesStatus />

                {/* Quick Actions */}
                <QuickActions />
            </ScrollView>
        </PageLayout>
    );
}