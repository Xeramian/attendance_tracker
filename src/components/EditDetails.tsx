import { View } from "react-native";
import { AppText } from "./AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

export const EditDetails = () =>  {
    return (
        <View className="px-4 flex flex-col gap-6">
            <EditDetail property="Username" value="Xeramian" />
            <EditDetail property="Roll No." value="240102244" />
            <EditDetail property="Email" value="raman.agrawal@iitg.ac.in" />
            <EditDetail property="Department" value="Electronics and Electrical" />
            <EditDetail property="Semester" value="1st Semester" />
        </View>
    );
}

const EditDetail = ({ property, value }: { property: string, value: string }) => {

    const [_value, setValue] = useState(value);

    return (
        <View className="flex flex-col gap-2">
            <AppText className="px-2 font-lexend-7 text-fix text-sm text-secondary-text">{property}</AppText>
            <View className="self-stretch flex flex-row border-2 rounded-xl border-light-border bg-[#FFFFFF] gap-4 justify-between">
                {/* <AppText className="font-lexend-7 text-fix text-sm text-primary-text">{value}</AppText> */}
                <TextInput textBreakStrategy="simple" autoCorrect={false} spellCheck={false} value={_value} onChangeText={(text) => { setValue(text) }} className="font-lexend-7 p-4 rounded-xl text-fix text-sm text-primary-text w-full" />
                <View className="absolute right-4 top-0 bottom-0 items-center justify-center">
                    <MaterialIcons name={"edit"} size={20} color={"#6B7280"} />
                </View>
            </View>
        </View>
    );
}