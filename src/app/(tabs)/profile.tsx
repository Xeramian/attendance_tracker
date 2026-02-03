import { AcademicSettings } from '@/components/AcademicSettings';
import { Header } from '@/components/Header';
import { LogOutButton } from '@/components/LogOutButton';
import { PageLayout } from '@/components/PageLayout';
import { UserInformation } from '@/components/UserInformation';
import { UserProfile } from '@/components/UserProfile';
import { Platform, ScrollView, View } from 'react-native';

export default function ProfileScreen() {
    return (
        <PageLayout>
            {/* 1. Header is outside. It takes up its natural height. */}
            <Header heading='Profile' />

            {/* 2. Wrap the ScrollView in a View with flex: 1.
               This View acts as the "Anchor" for the ScrollView. */}
            <ScrollView showsVerticalScrollIndicator={Platform.OS === 'web'} contentContainerClassName='flex flex-col gap-12 py-8'>
                {/* User Profile */}
                <UserProfile />

                {/* User Information */}
                <UserInformation />

                {/* Academic Settings */}
                <AcademicSettings />

                {/* Log Out Button */}
                <LogOutButton />
            </ScrollView>
        </PageLayout>
    );
}