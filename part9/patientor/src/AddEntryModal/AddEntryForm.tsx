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
import { /* inRangeInclusive, isFormatted, */ assertNever } from '../typeValidators';

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
      // enableReinitialize make Formik to deep-compare initialValues prop passed on each form re-rendering
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        // const requiredError = 'Please, check your input';
        const errors: Record<string, string> = {};

        // if(!type) {
        //   errors.type = requiredError;
        // }
        // if (!isFormatted(date)) {
        //   errors.date = `Missing or incorrectly formatted date value: ${date}`;
        // }
        // if (!description) {
        //   errors.description = requiredError;
        // }
        // if (!(diagnosisCodes.length)) {
        //   errors.diagnosesCode = requiredError;
        // }
        // if (!specialist) {
        //   errors.specialist = requiredError;
        // }
        // if (!inRangeInclusive({
        //   min: 0,
        //   max: 3,
        //   value: healthCheckRating
        // })) {
        //   errors.healthCheckRating = 'value must be between 0 and 3';
        // }
        console.log('VALIDATE', values);
        
        return errors;
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
                /* 
                  type assertions implemented in order to access and set to state the value property from e.target, which otherwise is not allowed by the compiler (TS)
                  https://github.com/ant-design/ant-design/issues/6879#issuecomment-405451420  
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