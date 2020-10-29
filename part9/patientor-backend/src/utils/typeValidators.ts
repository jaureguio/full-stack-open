/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v1 } from 'uuid';
import {
  Patient,
  Gender,
  PublicPatient,
  BaseEntry,
  Entry,
  HealthCheckEntry,
  SickLeave,
  OccupationalHealthCareEntry,
  Discharge,
  HospitalEntry,
  EntryType,
  Diagnose
} from './types';

const uuid: () => string = v1;

function isString(val: any): val is string {
  return typeof val === 'string';
}

function toValidString(val: any): string {
  if (val && isString(val)) {
    return val;
  }
  throw new Error(`Incorrect or missing type`);
}

function isFormatted(val: string): boolean {
  return /\b\d{4}-\d{2}-\d{2}\b/.test(val);
}

function toValidDate(val: any): string {
  if(val && isString(val) && isFormatted(val)) {
    return val;
  }
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Missing or incorrectly formatted date value: ${val}`);
  
}

function isNumeric(val: any): val is number {
  return !Number.isNaN(val) && typeof val === 'number';
}

function toValidNumber(val: any): number {
  if (isNumeric(val)) {
    return val;
  }
  throw new Error(`Incorrect or missing type`);
}

function isGender(val: any): val is Gender {
  return Object.values(Gender).includes(val);
}

function toValidGender(val: any): Gender {
  if (val && isGender(val)) {
    return val;
  }
  throw new Error(`Incorrect or missing gender`);
}

function isSickLeave(obj: Record<string, any>): obj is SickLeave {
  return Object.keys(obj).every((field) => {
    return ['startDate', 'endDate'].includes(field) && isString(obj[field]);
  });
}

function toValidSickLeave(obj: any): SickLeave {
  if (Object.keys(obj).length > 0 && isSickLeave(obj)) {
    return obj;
  }
  throw new Error('Incorrect or missing entry field');
}

function isDischarge(obj: Record<string, any>): obj is Discharge {
  return Object.keys(obj).every((field) => {
    return !(['date', 'criteria'].includes(field) && isString(obj[field]));
  });
}

function toValidDischarge(obj: any): Discharge {
  if (Object.keys(obj).length > 0 && isDischarge(obj)) {
    return obj;
  }
  throw new Error('Incorrect or missing entry field');
}

function toValidDiagnoses(val: any): Array<Diagnose['code']> {
  if(Array.isArray(val) && val.every(isString)) {
    return val;
  }
  throw new Error('Incorrect or missing entry field');
}

export function toValidPatient(obj: Record<string, unknown>): Patient {
  return ({
    id: uuid(),
    name: toValidString(obj.name),
    dateOfBirth: toValidString(obj.dateOfBirth),
    ssn: toValidString(obj.ssn),
    gender: toValidGender(obj.gender),
    occupation: toValidString(obj.occupation),
    entries: [],
  });
}

// field 'ssn' is being excluded from the patient obj passed
export function toPublicPatient({ ssn: _ssn, ...publicPatient }: Patient): PublicPatient {
  return publicPatient;
}

export function toValidEntry(obj: Record<string, any>): Entry | void {
  const baseEntry: BaseEntry = {
    id: uuid(),
    date: toValidDate(obj.date),
    specialist: toValidString(obj.specialist),
    description: toValidString(obj.description),
    diagnosisCodes: toValidDiagnoses(obj.diagnosisCodes)
  };

  switch (obj.type) {
    case EntryType.HealthCheck: {
      const healthCheckEntry: HealthCheckEntry = {
        ...baseEntry,
        type: EntryType.HealthCheck,
        healthCheckRating: toValidNumber(obj.healthCheckRating),
      };
      return healthCheckEntry;
    }
    case EntryType.OccupationalHealthcare: {
      const OHCEntry: OccupationalHealthCareEntry = {
        ...baseEntry,
        type: EntryType.OccupationalHealthcare,
        employerName: toValidString(obj.employerName),
      };
      if (Object.keys(obj.sickLeave).length > 0) {
        OHCEntry.sickLeave = toValidSickLeave(obj.sickLeave);
      }
      return OHCEntry;
    }
    case EntryType.Hospital: {
      const hospitalEntry: HospitalEntry = {
        ...baseEntry,
        type: EntryType.Hospital,
        discharge: toValidDischarge(obj.discharge)
      };
      return hospitalEntry;
    }
    default:
      throw new Error('Invalid entry input');
  }
}

// export function assertNever (val: never): never {
//   throw new Error(`Unhandled entry ${JSON.stringify(val)}`); 
// }
