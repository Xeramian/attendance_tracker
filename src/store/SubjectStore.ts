import { create } from 'zustand';
import * as Crypto from 'expo-crypto';
import { AttendanceType } from "@/constants/attendance";
import { ColorValue } from "react-native";
import { colors } from '@/constants/colors';

interface Classes {
    time: Date;
}

interface Attendance {
    time: Date;
    status: AttendanceType;
}

interface Subject {
    id: string;
    title: string;
    venue: string;
    code: string;
    targetAttendance: number;
    totalClasses: Array<Classes>;
    color: ColorValue;
    bg: ColorValue;
    icon: MaterialIconName;
    weeklySchedule: WeeklySchedule;
    prof: string;
    exceptions?: { cancelled: CancelledClasses, unforseen: UnforseenClasses }
    isActive: boolean;
}

interface WeeklySchedule {
    schedule: Array<{ day: number, startTime: Date, endTime: Date }>
}

interface CancelledClasses {
    cancelledExceptions: Array<{ date: Date, startTime: Date, endTime: Date }>
}

interface UnforseenClasses {
    unforseenExceptions: Array<{ date: Date, startTime: Date, endTime: Date }>
}

// Define the Store's content
interface SubjectState {
  subjects: Array<Subject>;
  // Actions
  addSubject: (title: string, venue: string, code: string, color: ColorValue, bg: ColorValue, icon: MaterialIconName, prof: string, weeklySchedule: WeeklySchedule, exceptions?: { cancelled: CancelledClasses, unforseen: UnforseenClasses }) => void;
  removeSubject: (id: string) => void;
}

export const useSubjectStore = create<SubjectState>((set) => ({
    subjects: [],
    addSubject: (title: string, venue: string, code: string, color: ColorValue, bg: ColorValue, icon: MaterialIconName, prof: string, weeklySchedule: WeeklySchedule, exceptions?: { cancelled: CancelledClasses, unforseen: UnforseenClasses }) => set((state) => ({
        subjects: [
            ...state.subjects,
            {
                id: Crypto.randomUUID(),
                title,
                venue,
                targetAttendance: 75,
                code,
                studentAttendance: [],
                totalClasses: [{time: new Date()} satisfies Classes],
                color,
                bg,
                prof,
                icon,
                weeklySchedule,
                exceptions: exceptions??{ cancelled: { cancelledExceptions: [{ date: new Date(2026, 2, 9), startTime: new Date(0, 0, 0, 9), endTime: new Date(0, 0, 0, 10) }] }, unforseen: { unforseenExceptions: [{ date: new Date(2026, 4, 12), startTime: new Date(0, 0, 0, 11, 30), endTime: new Date(0, 0, 0, 12, 30) }] } },
                isActive: true
            }
        ] as Array<Subject>
    })),
    removeSubject: (id) => set((state) => ({
        subjects: state.subjects.filter((s) => s.id !== id)
    })),
}))

var cached_classes: Map<string, Array<{title: string, venue: string, startTime: Date, endTime: Date}>> = new Map();

useSubjectStore.subscribe((state) => {
  cached_classes = new Map()
});

export const getClasses = (date: string) => {
  if (!cached_classes.has(date)) {
    let required_classes: Array<{title: string, venue: string, startTime: Date, endTime: Date}> = [];
    let _subjects = useSubjectStore.getState().subjects;
    _subjects.forEach(_subject => {
        _subject.weeklySchedule.schedule.forEach(weekly_schedule => {

          const isCancelled = _subject.exceptions?.cancelled.cancelledExceptions.some(exc => 
            exc.date.toDateString() == date && exc.startTime.toTimeString() == weekly_schedule.startTime.toTimeString() && exc.endTime.toTimeString() == weekly_schedule.endTime.toTimeString()
          );

          if (!isCancelled && weekly_schedule.day == new Date(date).getDay()) {
              required_classes.push({
                  title: _subject.title,
                  venue: _subject.venue,
                  startTime: weekly_schedule.startTime,
                  endTime: weekly_schedule.endTime
              })
          }
        })

        _subject.exceptions?.unforseen.unforseenExceptions.forEach(schedule => {
          if (schedule.date.toDateString() == date) {
            required_classes.push({
                title: _subject.title,
                venue: _subject.venue,
                startTime: schedule.startTime,
                endTime: schedule.endTime
            })
          }
        });
    });

    required_classes.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())

    cached_classes.set(date, required_classes);
  }
  return cached_classes.get(date) ?? []
}

const testSubjects = [
  { 
    title: "Advanced Physics", 
    code: "PH101", 
    color: colors.subject_blue, 
    bg: colors.blue_background, 
    icon: "car-repair", 
    venue: "Newton Lab - Room 302",
    prof: "Dr. Walter Lewin" 
  },
  { 
    title: "English Literature", 
    code: "LIT2", 
    color: colors.subject_purple, 
    bg: colors.purple_background, 
    icon: "10k", 
    venue: "Old Library Wing",
    prof: "Prof. Jane Austen" 
  },
  { 
    title: "Intro to Macroeconomics & Global Markets", 
    code: "EC1", 
    color: colors.subject_green, 
    bg: colors.red_background, 
    icon: "bar-chart", 
    venue: "Grand Hall B",
    prof: "Dr. Adam Smith" 
  },
  { 
    title: "Organic Chemistry", 
    code: "CHM3", 
    color: colors.subject_orange, 
    bg: colors.orange_background, 
    icon: "flash-on", 
    venue: "Chemical Sciences Blk 4",
    prof: "Dr. Marie Curie" 
  },
  { 
    title: "Comp. Sci. & Engineering", 
    code: "CS#1", 
    color: colors.subject_gray, 
    bg: colors.green_background, 
    icon: "code", 
    venue: "Virtual Learning Portal",
    prof: "Prof. Alan Turing" 
  },
  { 
    title: "World History", 
    code: "HIS2", 
    color: colors.subject_purple, 
    bg: colors.yellow_background, 
    icon: "interpreter-mode", 
    venue: "West Side Annex 12",
    prof: "Dr. Howard Zinn" 
  },
  { 
    title: "Fine Arts", 
    code: "ART7", 
    color: colors.subject_pink, 
    bg: colors.pink_background, 
    icon: "palette", 
    venue: "Studio 5 - Arts Center",
    prof: "Prof. Leonardo Da Vinci" 
  }
] satisfies Array<{ 
  title: string, 
  code: string, 
  color: ColorValue, 
  bg: ColorValue, 
  icon: MaterialIconName, 
  venue: string,
  prof: string 
}>;

// Execute the injection safely outside of React
testSubjects.forEach((s) => {
    useSubjectStore.getState().addSubject(
        s.title, 
        s.venue, 
        s.code, 
        s.color, 
        s.bg, 
        s.icon, 
        s.prof, 
        { 
          schedule: [ { day: 1, startTime: new Date(0, 0, 0, 9, 0, 0), endTime: new Date(0, 0, 0, 10, 0, 0) } ]
        }
    );
});