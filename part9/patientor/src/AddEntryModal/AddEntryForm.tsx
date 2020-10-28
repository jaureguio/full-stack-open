import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { EntryFormValues, EntryType } from '../types';
import { inRangeInclusive, isFormatted } from '../typeValidators';

import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';

interface Props {
  onSubmit: (inputs: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        specialist: '',
        type: '' as EntryType,
        description: '',
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={({
        type,
        date,
        description,
        diagnosisCodes,
        specialist,
        healthCheckRating
      }) => {
        const requiredError = 'Please, check your input';
        const errors: Record<string, string> = {};

        if(!type) {
          errors.type = requiredError;
        }
        if (!isFormatted(date)) {
          errors.date = `Missing or incorrectly formatted date value: ${date}`;
        }
        if (!description) {
          errors.description = requiredError;
        }
        if (!(diagnosisCodes.length)) {
          errors.diagnosesCode = requiredError;
        }
        if (!specialist) {
          errors.specialist = requiredError;
        }
        if (!inRangeInclusive({
          min: 0,
          max: 3,
          value: healthCheckRating
        })) {
          errors.healthCheckRating = 'value must be between 0 and 3';
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
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
            <Field
              label='Type'
              name='type'
              placeholder='HealthCheck'
              component={TextField}
            />
            <Field
              label='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Health check rating'
              name='healthCheckRating'
              component={NumberField}
              min={0}
              max={3}
            />
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