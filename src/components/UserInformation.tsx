import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { InfoTile } from "./InfoTile";

export const UserInformation = () => {
    return (
        <View className="mx-4 flex-col items-start gap-2">
            <Text className='text-secondary-text text-sm font-lexend-6 select-none'>Personal Information</Text>
            <View className="self-stretch flex-col rounded-xl border-light-border border-2 bg-interactive">
                <InfoTile icon="mail" primaryColor={"#2563EB"} secondaryColor={"#EFF6FF"} property="Email" value="raman.agrawal@iitg.ac.in" />
                <InfoTile icon="school" primaryColor={"#9333EA"} secondaryColor={"#FAF5FF"} property="Department" value="Electrical and Electronics" />
                <InfoTile icon="calendar-today" primaryColor={"#16A34A"} secondaryColor={"#F0FDF4"} property="Semester" value="4th Semester" />
            </View>
        </View>
    );
}