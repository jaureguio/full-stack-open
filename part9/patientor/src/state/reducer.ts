import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  };

export type PatientActionCreator = (payload: Patient) => Action;
export type PatientListActionCreator = (payload: Patient[]) => Action;
export type DiagnosesActionCreator = (payload: Diagnosis[]) => Action;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        displayedPatient: {
          ...state.displayedPatient,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: [
          ...state.diagnoses,
          ...action.payload
        ]
      };
    default:
      return state;
  }
};

export const setPatientList: PatientListActionCreator = (patientList) => ({
  type: 'SET_PATIENT_LIST',
  payload: patientList
});

export const setPatient: PatientActionCreator = (patient) => {
  console.log('ACTION CREATOR SETPATIENT');
  return {
    type: 'SET_PATIENT',
    payload: patient
  };
};

export const addPatient: PatientActionCreator = (patientEntry) => ({
  type: 'ADD_PATIENT',
  payload: patientEntry
});

export const setDiagnoses: DiagnosesActionCreator = (diagnoses) => {
  console.log('ACTION CREATOR SETDIAGNOSES');
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnoses
  };
};