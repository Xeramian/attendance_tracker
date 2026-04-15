import { AppText } from '@/components/AppText';
import { MonthCalendar } from '@/components/MonthCalendar';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/PageLayout';
import { ScheduleList } from '@/components/ScheduleList';
import { actions } from '@/constants/actions';
import { WeekCalendar } from '@/components/WeekCalendar'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

export default function CalendarScreen() {
    const [maxHeight, setMaxHeight] = useState(0);

    const params = useLocalSearchParams<{ expanded?: string }>();

    const [expanded, setExpanded] = useState(false);

    useFocusEffect(useCallback(() => {
        if (params.expanded === 'true') {
            console.log("expanded");
            setExpanded(true);
            router.setParams({ expanded: undefined });
        }        
    }, [params.expanded]))

    useFocusEffect(useCallback(() => {
        return () => {
            setExpanded(false);
        }
    }, []))

    const [calendarType, setCalendarType] = useState<'month'|'week'>('month');

    const [date, setDate] = useState(new Date());

    return (
        <PageLayout>
            {/* Main Header */}
            <Header heading='Calendar' rightActions={[{ icon: "filter-list" }, { icon: <AppText className='font-lexend-5 text-lg w-7'>{calendarType == 'week' ? '07' : calendarType == 'month' ? '31' : 0}</AppText>, fn: () => { setCalendarType(calendarType=='month'?'week':'month') } }]} />

            {
                calendarType == 'month' ? 
                    <>
                        <View onLayout={(event) => {setMaxHeight(event.nativeEvent.layout['height'])}}>
                            <MonthCalendar onChangeDate={(date) => {setDate(date)}} />
                        </View>

                        <ScheduleList date={date} initialExpanded={expanded} maximumTopDisplacement={maxHeight} />
                    </>
                :
                    <WeekCalendar />
            }
        </PageLayout>
    );
}