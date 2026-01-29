import { MaterialIcons } from "@expo/vector-icons"
import { Text, View } from "react-native"

export const Header = ({ heading, subheading, actions }: { heading?: string, subheading?: string, actions?: Array<MaterialIconName> }) => {
    return (
        <View className='h-25 p-4 flex flex-row items-center justify-between border-b-2 border-light-border select-none z-1 bg-page'>
            <View className='flex flex-col gap-1 grow'>
                { heading && <Text className='text-primary-text text-2xl font-lexend-7 px-0.5'>{heading}</Text> }
                { subheading && <Text className='text-secondary-text text-sm font-lexend px-0.5'>{subheading}</Text> }
            </View>

            <View className="flex flex-row gap-6">
                { actions?.map((icon, i) => <MaterialIcons key={i} name={icon} size={24} color={"#000000"} />) }
            </View>
        </View>
    )
}