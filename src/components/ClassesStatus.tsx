import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export const ClassesStatus = () => {
    return (
        <View className='my-2 mx-4 flex flex-col gap-3 items-stretch'>
            <View className='flex flex-row h-7 items-center justify-between select-none'>
                <Text className='text-primary-text text-lg font-lexend-7'>Next Class</Text>
                <Text className='text-nav text-sm font-lexend-5'>See all</Text>
            </View>
            <View className='border rounded-xl bg-white border-light-border p-4 flex flex-row justify-between'>
                <View className='flex flex-col gap-4'>
                    <View className='flex flex-col gap-2'>
                        <View className='flex self-start flex-row gap-1.5 px-2.5 py-1 bg-urgent-accent rounded-full items-center select-none'>
                            <Text className='text-xs font-lexend-7 text-urgent'>Starts in {15}m</Text>
                            {/* <Text className='text-xs font-lexend-7 text-urgent'>Starts in {14}m{"\u200B"}</Text> */}
                            <MaterialIcons name="timer" color="#EA580C" size={14} />
                        </View>
                        <Text className='text-primary-text text-xl font-lexend-7'>Advanced Calculus</Text>
                    </View>
                    <View>
                        <View className='flex flex-row gap-1.5 h-5 items-center'>
                            <MaterialIcons name="location-on" color="#617589" size={16} />
                            <Text className='text-secondary-text text-sm font-lexend'>Room 304 • Science Block</Text>
                        </View>
                        <View className='flex flex-row gap-1.5 h-5 items-center'>
                            <MaterialIcons name="schedule" color="#617589" size={16} />
                            <Text className='text-secondary-text text-sm font-lexend'>10:30 AM - 11:30 AM</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Image source={{ uri: 'https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg' }} className='w-30 h-30 rounded-lg' />
                </View>
            </View>
        </View>
    );
}