import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid } from 'semantic-ui-react';

import { useStateValue } from '../state';
import {
  EntryFormValues,
  EntryType,
  OccupationalHealthCareEntry,
  HealthCheck,
  Hospital
} from '../types';
import { inRangeInclusive, isFormatted, assertNever } from '../typeValidators';

import {
  TextField,
  SelectField,
  DiagnosisSelection,
  NumberField,
  Option
} from '../AddPatientModal/FormField';

interface Props {
  onSubmit: (inputs: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: Option[] = [
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthcare' }
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [baseValues, setBaseValues] = useState<EntryFormValues>(() => ({
    date: '',
    specialist: '',
    // default type
    type: EntryType.HealthCheck,
    description: '',
    diagnosisCodes: [] 
  }));

  const [{ diagnoses }] = useStateValue();

  let initialValues: EntryFormValues;
  switch (baseValues.type) {
    case EntryType.HealthCheck:
      initialValues = {
        ...baseValues,
        healthCheckRating: 0
      } as HealthCheck;
      break;

    case EntryType.Hospital:
      initialValues = {
        ...baseValues,
        discharge: {
          date: '',
          criteria: ''
        }
      } as Hospital;
      break;

    case EntryType.OccupationalHealthcare:
      initialValues = {
        ...baseValues,
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        }
      } as OccupationalHealthCareEntry;
      break;
  
    default:
      return assertNever(baseValues.type);
  }

  return (
    <Formik
      /**
       * 
       * enableReinitialize makes Formik to deep-compare new 'initialValues'
       * prop against its value from previous render. Form is reinitialized if changes.
       * 
       */
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const {
          date,
          specialist,
          type,
          description,
        } = values;

        const requiredError = 'A value is required';
        const dateFormatError = (date: string, required = false) => `Incorrectly formatted ${required ? `or missing` : null} date value: ${date}`;


        type BaseEntryErrors = Record<keyof EntryFormValues, string>;
        type HealthCheckEntryErrors = { healthCheckRating: string };
        type HospitalEntryErrors = {
          discharge: {
            date?: string;
            criteria?: string;
          };
        };
        type OccupationalHealthcareEntryErrors = {
          employerName: string;
          sickLeave?: {
            startDate?: string;
            endDate?: string;
          };
        };

        /**
         *
         * Generic intersection with conditional types
         * https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types
         * 
         * 'Errors' is a generic intersection between type 'BaseEntryErrors' and one of
         * 'HealthCheckEntryErrors', 'HospitalEntryErrors' or
         * 'OccupationalHealthcareEntryErrors'. Which one is picked for the intersection
         * is determined based on the type which T is extending from.
         *
         */
        type Errors<T> = BaseEntryErrors & (T extends EntryType.HealthCheck
        ? HealthCheckEntryErrors
        : T extends EntryType.Hospital 
        ? HospitalEntryErrors
        : T extends EntryType.OccupationalHealthcare
        ? OccupationalHealthcareEntryErrors
        : never);

        const baseErrors = {} as Errors<typeof type>;

        if (!isFormatted(date)) {
          baseErrors.date = dateFormatError(date, true);
        }
        if (!specialist) {
          baseErrors.specialist = requiredError;
        }
        if(!type) {
          baseErrors.type = requiredError;
        }
        if (!description) {
          baseErrors.description = requiredError;
        }

        /**
         * 
         * Checking type-specific errors from inputs
         * 
         * Note: type assertions have to be done for both 'values' and 'baseErrors'
         *       variables in order to both get and set properties from them
         *       in accordingly. I couldn't figure out why 'if' statements are
         *       not enough to make the compiler determine type of 'values.type'
         *       even though each block scope/context sets the type accordingly.
         * 
         */

        let typeSpecificErrors: Errors<typeof type> = {} as Errors<typeof type>;
        if(type === EntryType.HealthCheck) {
          const { healthCheckRating } = values as HealthCheck;
          typeSpecificErrors = baseErrors as Errors<typeof type>;

          if (!inRangeInclusive({
            min: 0,
            max: 3,
            value: healthCheckRating
          })) {
            typeSpecificErrors.healthCheckRating = 'value must be between 0 and 3';
          }
        } else if(type === EntryType.Hospital) {          
          const { discharge } = values as Hospital;
          typeSpecificErrors = baseErrors as Errors<typeof type>;
          
          if(!isFormatted(discharge.date)) {
            typeSpecificErrors.discharge = {
              date: dateFormatError(discharge.date, true)
            };
          }
          if(!discharge.criteria) {
            typeSpecificErrors.discharge = {
              ...typeSpecificErrors.discharge,
              criteria: requiredError
            };
          }
        } else if(type === EntryType.OccupationalHealthcare) {
          const { employerName, sickLeave } = values as OccupationalHealthCareEntry;
          typeSpecificErrors = baseErrors as Errors<typeof type>;

          if(!employerName) {
            typeSpecificErrors.employerName = requiredError;
          }
          if(sickLeave && !isFormatted(sickLeave.startDate)) {
            typeSpecificErrors.sickLeave = {
              startDate: dateFormatError(sickLeave.startDate)
            };
          }
          if(sickLeave && !isFormatted(sickLeave.endDate)) {
            typeSpecificErrors.sickLeave = {
              ...typeSpecificErrors.sickLeave,
              endDate: dateFormatError(sickLeave.endDate)
            };
          }
        }
        
        return typeSpecificErrors;
      }}
    >
      {({
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        values
      }) => {
        return (
          <Form className='form ui'>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label='Date'
              name='date'
              placeholder='YYYY-MM-DD'
              component={TextField}
            />
            <Field
              label='Specialist'
              name='specialist'
              component={TextField}
            />
            <SelectField
              label='Type'
              name='type'
              options={typeOptions}
              onChange={(e) => {
              /**
               *  
               * Type assertions on the event parameter 'e' are implemented in order
               * to allow access to the 'value' property from e.target, which otherwise
               * is not allowed by the compiler.
               * https://github.com/ant-design/ant-design/issues/6879#issuecomment-405451420
               * 
               */
                const entryTypeFromForm = (e.target as HTMLSelectElement).value as EntryType;
                setBaseValues({
                  date: values.date,
                  specialist: values.specialist,
                  type: entryTypeFromForm,
                  description: values.description,
                  diagnosisCodes: values.diagnosisCodes
                });
                
                
              }}
            />
            <Field
              label='Description'
              name='description'
              component={TextField}
            />
            {values.type === 'HealthCheck' &&
              <Field
                label='Health check rating'
                name='healthCheckRating'
                component={NumberField}
                min={0}
                max={3}
              />
            }
            {values.type === 'Hospital' && 
             (<>
                <Field
                  label='Discharge date'
                  name='discharge.date'
                  placeholder='YYYY-MM-DD'
                  component={TextField}
                />
                <Field
                  label='Discharge criteria'
                  name='discharge.criteria'
                  component={TextField}
                />
              </>)
            }
            {values.type === 'OccupationalHealthcare' && 
             (<>
                <Field
                  label='Sickness start date'
                  name='sickLeave.startDate'
                  placeholder='YYYY-MM-DD'
                  component={TextField}
                />
                <Field
                  label='Sickness end date'
                  name='sickLeave.endDate'
                  placeholder='YYYY-MM-DD'
                  component={TextField}
                />
                <Field
                  label='Employer name'
                  name='employerName'
                  component={TextField}
                />
              </>)
            }
            <Grid>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add entry
                </Button>
              </Grid.Column>
              <Grid.Column floated='left' width={5}>
                <Button
                  type='button'
                  color='grey'
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;