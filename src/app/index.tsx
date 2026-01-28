import { MainHeader } from '@/components/MainHeader';
import { AttendanceCard } from '@/components/AttendanceCard';
import { ClassesStatus } from '@/components/ClassesStatus';
import { QuickActions } from '@/components/QuickActions';
import { PageLayout } from '@/components/PageLayout';

export default function HomeScreen() {
    return (
        <PageLayout>
            {/* Main Header */}
            <MainHeader />

            {/* Attendance Card */}
            <AttendanceCard />

            {/* Status */}
            <ClassesStatus />

            {/* Quick Actions */}
            <QuickActions />
        </PageLayout>
    );
}