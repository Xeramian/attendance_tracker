import { Text, View } from "react-native";

export const AttendanceCard = () => {
    return (
        <View className='h-55 my-2 mx-4 relative overflow-hidden select-none'>
            <View className='bg-card-primary rounded-2xl absolute inset-0 p-6 flex flex-col justify-between -z-1'>
            <View className='bg-card-secondary rounded-full absolute size-16 bottom-24 right-16' />
            <View className='bg-card-secondary rounded-full absolute size-32 -bottom-8 -right-10' />
                <View className='flex flex-col gap-4 z-1'>
                    <Text className='leading-[16px] text-sm text-fix font-lexend-5 text-card-secondary-text'>Today's Attendance</Text>
                    <Text className='text-5xl text-fix font-lexend-7 text-card-primary-text'>75%</Text>
                    <Text className='leading-[16px] text-sm text-fix font-lexend-5 text-card-secondary-text'>3/4 Classes Attended</Text>
                </View>
                <View className='h-2 w-full relative z-1 rounded-full overflow-hidden'>
                    <View className='bg-card-bar-secondary inset-0 rounded-full absolute' />
                    <View className='bg-card-bar-primary rounded-full inset-0 -translate-x-[25%] absolute' />
                </View>
            </View>
        </View>
    );
}