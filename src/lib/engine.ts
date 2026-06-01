import { diseases, symptomMap } from '@/data/knowledgeBase';
import { DiagnosisResult, Disease } from '@/types';

export interface DiagnosisMatch {
  disease: Disease;
  probability: number;
  matchedSymptomIds: string[];
  matchedSymptomLabels: string[];
}

/**
 * Inference Engine
 * 
 * Formula: Probability = (matched symptoms / total disease symptoms) * 100
 * Returns the disease with the highest probability.
 * 
 * @param selectedSymptoms - Array of symptom IDs checked by the user
 * @returns Array of all diseases with probabilities, sorted descending
 */
export function calculateDiagnosis(selectedSymptoms: string[]): DiagnosisMatch[] {
  const results: DiagnosisMatch[] = diseases.map((disease) => {
    const matchedSymptomIds = disease.symptoms.filter((symptomId) =>
      selectedSymptoms.includes(symptomId)
    );

    const probability = (matchedSymptomIds.length / disease.symptoms.length) * 100;

    const matchedSymptomLabels = matchedSymptomIds.map(
      (id) => symptomMap[id]?.label ?? id
    );

    return {
      disease,
      probability: Math.round(probability),
      matchedSymptomIds,
      matchedSymptomLabels,
    };
  });

  // Sort by probability descending
  return results.sort((a, b) => b.probability - a.probability);
}

/**
 * Get the top diagnosis result
 */
export function getTopDiagnosis(selectedSymptoms: string[]): DiagnosisMatch | null {
  if (selectedSymptoms.length === 0) return null;
  const results = calculateDiagnosis(selectedSymptoms);
  return results[0]?.probability > 0 ? results[0] : null;
}

/**
 * Format a diagnosis match into a storable DiagnosisResult
 */
export function formatDiagnosisResult(
  match: DiagnosisMatch,
  patientName: string,
  patientAge: string,
  patientGender: string,
  selectedSymptoms: string[]
): DiagnosisResult {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    patientName,
    patientAge,
    patientGender,
    date: new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    resultDisease: match.disease.name,
    resultDiseaseId: match.disease.id,
    probability: match.probability,
    symptomsChecked: selectedSymptoms,
    matchedSymptomLabels: match.matchedSymptomLabels,
  };
}
