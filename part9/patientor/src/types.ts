export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  type: string;
  description: string;
  diagnosisCodes?: string[];
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface Hospital extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

interface HealthCheck extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: number;
  sickLeave?: string;
}

export type Entry = OccupationalHealthCareEntry | Hospital | HealthCheck;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientDict = Record<string, Patient>;