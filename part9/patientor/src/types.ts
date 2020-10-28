export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  type: EntryType;
  description: string;
  diagnosisCodes?: string[];
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface Hospital extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

interface HealthCheck extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: number;
}

export type Entry = OccupationalHealthCareEntry | Hospital | HealthCheck;

export enum EntryType {
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck',
  Hospital = 'Hospital'
}

export type EntryFormValues = Omit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientsDict = Record<string, Patient>;