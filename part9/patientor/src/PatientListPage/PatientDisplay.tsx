import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon, Segment } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from '../constants';
import { Diagnosis, Patient, Entry } from '../types';
import { assertNever } from '../typeValidators';

import { useStateValue, setPatient, setDiagnoses } from '../state/index';

const PatientDisplay: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ displayedPatient }, dispatch] = useStateValue();
  const [patientsError, setPatientsError] = useState<string>('');
  // const [diagnosesError, setDiagnosesError] = useState<string>('');

  const patient = displayedPatient[id];
  console.log(id);
  
  useEffect(() => {
    console.log('PATIENT EFFECT: ', patient);

    if(!patient) {
      const fetchData = async () => {
        try {
          const [patientData, diagnosesData] = await Promise.all([
            axios.get<Patient>(`${apiBaseUrl}/patients/${id}`),
            axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
          ]);
          const { data: patientFromApi } = patientData;
          const { data: diagnosesFromApi } = diagnosesData;
          dispatch(setPatient(patientFromApi));
          dispatch(setDiagnoses(diagnosesFromApi));
        } catch (error) {
          console.log(error.message);
          setPatientsError(error.message);
        }
      };
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  if(patientsError) {
    return <p>Patient not found!</p>;
  } else if(!patient) {
    return <p>Loading patient info...</p>;
  }
  
  return (
    <div>
      <h2>
        {patient.name} 
        <Icon 
          className={patient.gender === 'other'
            ? 'other gender'
            : patient.gender
          }
        />
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>Occuppation: {patient.occupation}</p>
      <h4>entries</h4>
        {patient.entries.map((entry) => <EntryDetails key={entry.id} entry={entry} />)}
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  type HealthColors = 'green' | 'yellow' | 'orange' | 'red';
  const heartColor: Record<number, HealthColors> = {
    0: 'green',
    1: 'yellow',
    2: 'orange',
    3: 'red',
  };

  switch (entry.type) {
    case 'Hospital': 
      return (
        <Segment>
          <h3>{entry.date} <Icon name='hospital' /></h3>
          <p>{entry.description}</p>
        </Segment>
      );
    case 'OccupationalHealthcare': 
      return (
        <Segment>
          <h3>{entry.date} <Icon name='stethoscope' /></h3>
          <p>{entry.description}</p>
        </Segment>
      );
    case 'HealthCheck':
      return (
        <Segment>
          <h3>{entry.date} <Icon name='user md' /></h3>
          <p>{entry.description}</p>
          <Icon name='heart' color={heartColor[entry.healthCheckRating]} />
        </Segment>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientDisplay;