export interface User {
  name: string;
  email: string;
  password: string;
}

export interface LoggedInUser {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface Patient {
  name: string;
  age: string;
  gender: 'Laki-laki' | 'Perempuan' | '';
}

export interface DiagnosisResult {
  id: string;
  patientName: string;
  patientAge: string;
  patientGender: string;
  date: string;
  resultDisease: string;
  resultDiseaseId: string;
  probability: number;
  symptomsChecked: string[];
  matchedSymptomLabels: string[];
}

export interface Symptom {
  id: string;
  label: string;
  question: string;
}

export interface Disease {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  symptoms: string[]; // symptom IDs
  commonSymptoms: string[]; // display labels
  selfCare: string;
  image?: string;
  icon?: string;
}
