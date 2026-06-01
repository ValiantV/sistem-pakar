'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LoggedInUser, Patient, DiagnosisResult, User } from '@/types';

interface AppState {
  // Auth
  user: LoggedInUser | null;
  registeredUsers: User[];

  // Current diagnosis session
  currentPatient: Patient | null;
  selectedSymptoms: string[];
  lastDiagnosisResult: DiagnosisResult | null;

  // History
  history: DiagnosisResult[];

  // Actions
  register: (user: User) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  setCurrentPatient: (patient: Patient) => void;
  setSelectedSymptoms: (symptoms: string[]) => void;
  toggleSymptom: (symptomId: string) => void;
  setLastDiagnosisResult: (result: DiagnosisResult) => void;
  addToHistory: (result: DiagnosisResult) => void;
  clearDiagnosisSession: () => void;
  deleteHistoryItem: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      registeredUsers: [],
      currentPatient: null,
      selectedSymptoms: [],
      lastDiagnosisResult: null,
      history: [],

      register: (newUser: User) => {
        const { registeredUsers } = get();
        const exists = registeredUsers.find((u) => u.email === newUser.email);
        if (exists) {
          return { success: false, error: 'Email sudah terdaftar.' };
        }
        set({ registeredUsers: [...registeredUsers, newUser] });
        return { success: true };
      },

      login: (email: string, password: string) => {
        const { registeredUsers } = get();
        const user = registeredUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) {
          return { success: false, error: 'Email atau password salah.' };
        }
        set({
          user: {
            name: user.name,
            email: user.email,
            isLoggedIn: true,
          },
        });
        return { success: true };
      },

      logout: () => {
        set({ user: null, currentPatient: null, selectedSymptoms: [], lastDiagnosisResult: null });
      },

      setCurrentPatient: (patient: Patient) => {
        set({ currentPatient: patient });
      },

      setSelectedSymptoms: (symptoms: string[]) => {
        set({ selectedSymptoms: symptoms });
      },

      toggleSymptom: (symptomId: string) => {
        const { selectedSymptoms } = get();
        if (selectedSymptoms.includes(symptomId)) {
          set({ selectedSymptoms: selectedSymptoms.filter((id) => id !== symptomId) });
        } else {
          set({ selectedSymptoms: [...selectedSymptoms, symptomId] });
        }
      },

      setLastDiagnosisResult: (result: DiagnosisResult) => {
        set({ lastDiagnosisResult: result });
      },

      addToHistory: (result: DiagnosisResult) => {
        const { history } = get();
        // Avoid duplicates
        const exists = history.find((h) => h.id === result.id);
        if (!exists) {
          set({ history: [result, ...history] });
        }
      },

      clearDiagnosisSession: () => {
        set({ currentPatient: null, selectedSymptoms: [], lastDiagnosisResult: null });
      },

      deleteHistoryItem: (id: string) => {
        const { history } = get();
        set({ history: history.filter((h) => h.id !== id) });
      },
    }),
    {
      name: 'sistem-pakar-storage',
      storage: createJSONStorage(() => {
        // SSR guard: use a no-op storage on server
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      partialize: (state) => ({
        user: state.user,
        registeredUsers: state.registeredUsers,
        history: state.history,
      }),
    }
  )
);
