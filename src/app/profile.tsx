import { AcademicSettings } from '@/components/AcademicSettings';
import { Header } from '@/components/Header';
import { LogOutButton } from '@/components/LogOutButton';
import { PageLayout } from '@/components/PageLayout';
import { UserInformation } from '@/components/UserInformation';
import { UserProfile } from '@/components/UserProfile';
import { View } from 'react-native';

export default function ProfileScreen() {
    return (
        <PageLayout>
            {/* Header */}
            <Header title='Profile' icon='notifications' />

            <View className='flex-col gap-8 mb-8'>
                {/* User Profile */}
                <UserProfile />

                {/* User Information */}
                <UserInformation />

                {/* Academic Settings */}
                <AcademicSettings />

                <LogOutButton />
            </View>
        </PageLayout>
    );
}