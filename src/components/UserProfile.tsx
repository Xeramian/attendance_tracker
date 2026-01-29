import { Image, Text, View } from "react-native";

export const UserProfile = () => {
    return (
        <View className="flex flex-col items-center gap-4">
            <Image source={{ uri: 'https://img-getpocket.cdn.mozilla.net/592x320/smart/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc10071b9-7d99-4417-8d7d-3fc841c44883.jpeg' }} className="size-32 rounded-full" />
            <View className="flex-col gap-1 items-center">
                <Text className='text-primary-text text-2xl font-lexend-7'>Xeramian</Text>
                <View className="px-3 py-1 bg-page-offset h-6 flex-row items-center rounded-full">
                    <Text className="text-quaternary-text text-xs font-lexend-5">Roll No. 240102244</Text>
                </View>
            </View>
        </View>
    );
}