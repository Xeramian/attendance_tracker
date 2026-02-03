import { useState } from "react";
import { Pressable, View } from "react-native";
import { AppText } from "./AppText";

export const ItemSelector = ({ items, onSelect }: { items: Array<string>, onSelect?: (item: string, index: number) => void }) => {
    if (items.length < 1) throw Error("No Items Provided");
    const [selected, setSelected] = useState(0);
    return (
        <View className='w-full h-10 rounded-xl bg-page-offset flex flex-row p-1'>
            {items.map((item, index) => 
                <Pressable key={index} onPress={() => { if (index == selected) return; setSelected(index); onSelect?.(item, index); }} className={`flex flex-1 items-center justify-center rounded-lg ${selected == index ? 'bg-page' : 'bg-page-offset'}`}>
                    <AppText className="text-primary-text text-fix font-lexend-6 leading-[16px] text-sm">{item}</AppText>
                </Pressable>
            )}
        </View>
    );
}