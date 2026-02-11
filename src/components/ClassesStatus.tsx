import { AppText } from '@/components/AppText';
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";

export const ClassesStatus = () => {
    return (
        <View className='my-2 mx-4 flex flex-col gap-3 items-stretch'>
            <View className='flex flex-row h-7 items-center justify-between select-none'>
                <AppText className='text-primary-text leading-[20px] text-lg text-fix font-lexend-7 grow'>Next Class</AppText>
                <Pressable onPress={() => { router.push({pathname: '/calendar', params: { expanded: 'true' }}); }}>
                    <AppText className='text-nav leading-[16px] text-sm text-fix font-lexend-5 grow text-right'>See all</AppText>
                </Pressable>
            </View>
            <Pressable onPress={() => { router.push('/subjectInfo/Mathematics') }} className='border rounded-xl bg-white border-light-border p-4 flex flex-row justify-between'>
                <View className='flex flex-col gap-4'>
                    <View className='flex flex-col gap-2 grow'>
                        <View className='flex self-start flex-row gap-1.5 px-2.5 py-1 bg-urgent-accent rounded-full items-center select-none'>
                            <AppText className='leading-[14px] text-xs text-fix font-lexend-7 text-urgent pr-.5'>Starts in {15}m</AppText>
                            <MaterialIcons name="timer" color="#EA580C" size={14} />
                        </View>
                        <View className="flex flex-row items-center grow px-1">
                            <AppText className='text-primary-text leading-[24px] text-xl text-fix font-lexend-7 grow'>Advanced Calculus</AppText>
                        </View>
                    </View>
                    <View>
                        <View className='flex flex-row gap-1.5 h-5 items-center'>
                            <MaterialIcons name="location-on" color="#617589" size={16} />
                            <AppText className='text-secondary-text leading-[16px] text-sm text-fix font-lexend'>Room 304 • Science Block</AppText>
                        </View>
                        <View className='flex flex-row gap-1.5 h-5 items-center'>
                            <MaterialIcons name="schedule" color="#617589" size={16} />
                            <AppText className='text-secondary-text leading-[16px] text-sm text-fix font-lexend'>10:30 AM - 11:30 AM</AppText>
                        </View>
                    </View>
                </View>
                <View>
                    <Image source={{ uri: 'https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg' }} className='w-30 h-30 rounded-lg' />
                </View>
            </Pressable>
        </View>
    );
}