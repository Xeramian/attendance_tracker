import { create } from 'zustand';
import * as Crypto from 'expo-crypto';
import { AttendanceType } from "@/constants/attendance";
import { ColorValue } from "react-native";

interface Classes {
    time: Date;
}

interface Attendance {
    time: Date;
    status: AttendanceType;

}

interface Subject {
    id: string;
    name: string;
    venue: string;
    targetAttendance: number;
    studentAttendance: Array<Attendance>;
    totalClasses: Array<Classes>;
    color: ColorValue;
    isActive: boolean;
}

// Define the Store's content
interface SubjectState {
  subjects: Subject[];
  // Actions
  addSubject: (name: string, venue: string, color: ColorValue) => void;
  toggleAttendance: (id: string) => void;
  removeSubject: (id: string) => void;
}

export const useSubjectStore = create<SubjectState>((set) => ({
    subjects: [],
    addSubject: (name: string, venue: string, color: ColorValue) => set((state) => ({
        subjects: [
            ...state.subjects,
            {
                id: Crypto.randomUUID(),
                name,
                venue,
                targetAttendance: 75,
                studentAttendance: [],
                totalClasses: [],
                color,
                isActive: true
            }
        ]
    })),
    toggleAttendance: (id) => set((state) => ({})),

    removeSubject: (id) => set((state) => ({
        subjects: state.subjects.filter((s) => s.id !== id)
    })),
}))