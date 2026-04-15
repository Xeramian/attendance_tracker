import { AppText } from "@/components/AppText";
import { Header } from "@/components/Header";
import { PageLayout } from "@/components/PageLayout";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ColorValue, Platform, Pressable, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from "react-native-gesture-handler";

const DAYS = [
    { label: "MON", value: 1 },
    { label: "TUE", value: 2 },
    { label: "WED", value: 3 },
    { label: "THU", value: 4 },
    { label: "FRI", value: 5 },
    { label: "SAT", value: 6 },
    { label: "SUN", value: 7 },
]

const vacationsIcons = [
    {bg: 'bg-[#137FEC]', border: 'border-[#137FEC]', icon: "ac-unit", iconColor: "#FFFFFF"},
    {bg: 'bg-[#FFEDD5]', border: 'border-[#EA580C]', icon: "forest", iconColor: "#EA580C"},
    {bg: 'bg-[#FEF9C3]', border: 'border-[#CA8A04]', icon: "sunny", iconColor: "#CA8A04"},
    {bg: 'bg-[#FEE2E2]', border: 'border-[#DC2626]', icon: "school", iconColor: "#DC2626"},
    {bg: 'bg-[#F3E8FF]', border: 'border-[#9333EA]', icon: "flight-takeoff", iconColor: "#9333EA"},
] satisfies Array<{bg: string, border: string, icon: MaterialIconName, iconColor: ColorValue}>;

export default function CreateHolidayScreen() {

    const [selectedType, setSelectedType] = useState<'Holiday'|'Schedule'>('Holiday');
    const [selectedIcon, setSelectedIcon] = useState(0);
    const [selectedDay, setSelectedDay] = useState(null);

    return (
        <PageLayout>
            <Header centerHeading={true} heading="New Exception" leftActions={[{ icon: 'close' }]} rightActions={[{ icon: 'check' }]} />
            <ScrollView>
                <View className="p-4 flex flex-col">
                    <View className="bg-page-offset p-1 rounded-lg flex flex-row">
                        <Pressable onPress={() => { setSelectedType('Holiday') }} className={`flex-1 items-center justify-center p-2 ${selectedType == 'Holiday' ? 'bg-page' : ''} rounded-lg`}>
                            <AppText className={`text-sm font-lexend-6 ${selectedType == 'Holiday' ? 'text-subject-blue' : 'text-secondary-text'}`}>Holiday / Vacation</AppText>
                        </Pressable>
                        <Pressable onPress={() => { setSelectedType('Schedule') }} className={`flex-1 items-center justify-center p-2 ${selectedType == 'Schedule' ? 'bg-page' : ''} rounded-lg`}>
                            <AppText className={`text-sm font-lexend-6 ${ selectedType=='Schedule' ? 'text-subject-blue' : 'text-secondary-text'}`}>Schedule Shift</AppText>
                        </Pressable>
                    </View>
                    {
                        selectedType == 'Holiday' ? 
                        <View className="py-16 flex flex-col gap-4">
                            <View className="flex flex-col gap-1">
                                <AppText className={`font-lexend-6 text-primary-text`}>Holiday Name</AppText>
                                <TextInput placeholder="e.g. Winter Break" placeholderTextColor={"#88898B"} style={{ paddingVertical: 12, paddingHorizontal: 16, color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }} underlineColorAndroid={"transparent"} />
                            </View>
                            <View className="flex flex-row gap-4">
                                <View className="flex-1 flex flex-col gap-1">
                                    <AppText className={`font-lexend-6 text-primary-text`}>Holiday Name</AppText>
                                    <View style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <AppText style={{color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14}}>mm/dd/yyyy</AppText>
                                        <MaterialIcons name="calendar-today" color={"#111418"} size={18} />
                                    </View>
                                </View>
                                <View className="flex-1 flex flex-col gap-1">
                                    <AppText className={`font-lexend-6 text-primary-text`}>Holiday Name</AppText>
                                    <View style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <AppText style={{color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14}}>mm/dd/yyyy</AppText>
                                        <MaterialIcons name="calendar-today" color={"#111418"} size={18} />
                                    </View>
                                </View>
                            </View>
                            <View className="flex flex-col justify-between items-start py-4 gap-4">
                                <View className="flex flex-col gap-1 items-start justify-center">
                                    <AppText className={`font-lexend-6 text-primary-text`}>Icon Style</AppText>
                                </View>
                                <ScrollView horizontal={true} contentContainerClassName="flex flex-row gap-4">
                                    {
                                        vacationsIcons.map(({ bg, border, icon, iconColor }, index) =>
                                            <Pressable onPress={() => {setSelectedIcon(index)}} key={index} className={`size-14 ${selectedIcon == index ? `border-2 ${border}` : ''} items-center justify-center rounded-full`}>
                                                <View className={`rounded-full size-12 ${bg} items-center justify-center`}>
                                                    <MaterialIcons name={icon} color={iconColor} size={24} />
                                                </View>
                                            </Pressable>
                                        )
                                    }
                                </ScrollView>
                            </View>
                        </View>
                        : selectedType == 'Schedule' ?
                        <View className="py-16 flex flex-col gap-4">
                            <View className="flex flex-row gap-4">
                                <View className="flex-1 flex flex-col gap-1">
                                    <AppText className={`font-lexend-6 text-secondary-text`}>DATE</AppText>
                                    <View style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <AppText style={{color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14}}>mm/dd/yyyy</AppText>
                                        <MaterialIcons name="calendar-today" color={"#111418"} size={18} />
                                    </View>
                                </View>
                            </View>
                            <View className="flex flex-col justify-between items-stretch py-4 gap-4">
                                <AppText className={`font-lexend-6 text-secondary-text`}>SHIFT DAY</AppText>
                                <Dropdown
                                    data={DAYS}
                                    labelField={"label"}
                                    valueField={"value"}
                                    value={ selectedDay }
                                    placeholder="Select a Day to Mimic"
                                    dropdownPosition="bottom"
                                    onChange={(day) => { setSelectedDay(day); }}
                                    showsVerticalScrollIndicator={Platform.OS=='web'}
                                    style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 2, borderColor: '#E5E7EB' }}
                                    selectedTextStyle={{ color: '#111418', fontFamily: 'Lexend-Medium', fontSize: 14 }}
                                    placeholderStyle={{
                                        color: '#88898B',
                                        fontFamily: 'Lexend-Medium',
                                        fontSize: 14
                                    }}
                                    containerStyle={{
                                        borderRadius: 12,
                                        overflow: 'hidden'
                                    }}
                                    // itemContainerStyle={{
                                    //     backgroundColor: '#'
                                    // }}
                                    itemTextStyle={{ 
                                        color: '#111418', 
                                        fontFamily: 'Lexend-Medium', 
                                        fontSize: 14 
                                    }}
                                />
                            </View>
                        </View>
                        : <></>
                    }
                </View>
            </ScrollView>
        </PageLayout>
    );
}