import { State } from './state';
import { Diagnosis, Patient, Entry } from '../types';

type EntryPayload = {
  entry: Entry;
  id: string;
};

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
    type: 'SET_PATIENT';
    payload: Patient;
  }
  | {
    type: 'SET_DIAGNOSES';
    payload: Diagnosis[];
  }
  | {
    type: 'ADD_ENTRY';
    payload: EntryPayload;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
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
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'SET_PATIENT':
      return {
        ...state,
        displayedPatients: {
          ...state.displayedPatients,
          [action.payload.id]: action.payload
        }
      };
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: [
          ...state.diagnoses,
          ...action.payload
        ]
      };
    case 'ADD_ENTRY':
      const { id: patientId, entry } = action.payload;
      const updatedPatients = {...state.patients};
      updatedPatients[patientId].entries.push(entry);
      const updatedDisplayedPatients = {...state.displayedPatients};
      updatedDisplayedPatients[patientId].entries.push(entry);
      return {
        ...state,
        patients: updatedPatients,
        displayedPatients: updatedDisplayedPatients,
      };
    default:
      return state;
  }
};

export type PatientListActionCreator = (payload: Patient[]) => Action;
export type PatientActionCreator = (payload: Patient) => Action;
export type DiagnosesActionCreator = (payload: Diagnosis[]) => Action;
export type EntryActionCreator = (payload: EntryPayload) => Action;

export const setPatientList: PatientListActionCreator = (patientList) => ({
  type: 'SET_PATIENT_LIST',
  payload: patientList
});

export const setPatient: PatientActionCreator = (patient) => {
  return {
    type: 'SET_PATIENT',
    payload: patient
  };
};

export const addPatient: PatientActionCreator = (newPatient) => ({
  type: 'ADD_PATIENT',
  payload: newPatient
});


export const setDiagnoses: DiagnosesActionCreator = (diagnoses) => {
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnoses
  };
};

export const addEntry: EntryActionCreator = ({ entry, id: patientId }) => ({
  type: 'ADD_ENTRY',
  payload: {
    entry,
    id: patientId
  }
});