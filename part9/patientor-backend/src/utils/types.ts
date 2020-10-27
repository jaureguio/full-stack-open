export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
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

export type PublicPatient = Omit<Patient, 'ssn'>;


export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}