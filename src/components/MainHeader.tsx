import { MaterialIcons } from "@expo/vector-icons"
import { Image, Text, View } from "react-native"

export const MainHeader = () => {
    return (
        <View className='h-25 p-4 flex flex-row items-center justify-between border-b-2 border-light-border select-none'>
            <View className='flex flex-col gap-1'>
                <Text className='text-primary-text text-2xl font-lexend-7'>Welcome back, Xeramian!</Text>
                <Text className='text-secondary-text text-sm font-lexend'>Computer Science Major</Text>
            </View>

            <View>
                {/* <Image source={{ uri: 'https://m.media-amazon.com/images/M/MV5BYTgyMTlkZTgtMTMxYi00Mjk5LTg2NTMtNGYyMDVlZWM0NmZjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' }} className='size-12 rounded-full' /> */}
                <MaterialIcons name="notifications" size={24} color={"#000000"} />
            </View>
        </View>
    )
}