import { Calendar } from '@/components/Calendar';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/PageLayout';
import { ScheduleList } from '@/components/ScheduleList';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

export default function CalendarScreen() {
    const refCalendar = useRef<View>(null);

    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        refCalendar.current?.measure((x, y, width, height, pageX, pageY) => {
            setMaxHeight(height);
        });
    }, [refCalendar]);


    return (
        <PageLayout>
            {/* Main Header */}
            <Header heading='Calendar' rightActions={["filter-list", "more-vert"]} />

            {/* Calendar */}
            <Calendar ref={refCalendar} />

            {/* Bouncy Schedule */}
            <ScheduleList maximumTopDisplacement={maxHeight} />
        </PageLayout>
    );
}