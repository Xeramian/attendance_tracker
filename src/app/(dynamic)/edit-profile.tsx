import { AcademicSettings } from '@/components/AcademicSettings';
import { EditDetails } from '@/components/EditDetails';
import { Header } from '@/components/Header';
import { LogOutButton } from '@/components/LogOutButton';
import { PageLayout } from '@/components/PageLayout';
import { UserInformation } from '@/components/UserInformation';
import { UserProfile } from '@/components/UserProfile';
import { actions } from '@/constants/actions';
import { router } from 'expo-router';
import { Platform, ScrollView, View } from 'react-native';

export default function editProfileScreen() {
    return (
        <PageLayout>
            {/* 1. Header is outside. It takes up its natural height. */}
            <Header centerHeading={true} heading='Edit Profile' leftActions={[{icon: 'close', fn: () => { router.back(); }}]} rightActions={[{icon: 'check'}]} />

            {/* 2. Wrap the ScrollView in a View with flex: 1.
               This View acts as the "Anchor" for the ScrollView. */}
            <ScrollView showsVerticalScrollIndicator={Platform.OS === 'web'} contentContainerClassName='flex flex-col gap-12 py-8'>
                {/* User Profile */}
                <UserProfile />

                <EditDetails />
            </ScrollView>
        </PageLayout>
    );
}