/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v1 } from 'uuid';
import { Patient, Gender, PublicPatient } from './types';

const uuid: () => string = v1;

export const toValidPatient = (obj: Record<string, unknown>): Patient => ({
  id: uuid(),
  name: toValidString(obj.name),
  dateOfBirth: toValidString(obj.dateOfBirth),
  ssn: toValidString(obj.ssn),
  gender: toValidGender(obj.gender),
  occupation: toValidString(obj.occupation),
});

export const toPublicPatient = ({ ssn: _ssn, ...publicPatient }: Patient): PublicPatient => publicPatient;

const toValidString = (val: any): string => {
  if(!(val && isString(val))) {
    throw new Error(`Incorrect or missing type`);
  }
  return val;
};

const isString = (val: any): val is string => typeof val === 'string';

const toValidGender = (val: any): Gender => {
  if(!(val && isGender(val))) {
    throw new Error(`Incorrect or missing gender type`);
  }
  return val;
};

const isGender = (val: any): val is Gender => Object.values(Gender).includes(val);

export type StrictPropertyCheck<T,TExpected, TError> = Exclude<T, TExpected> extends never ? Record<string, unknown> : TError;