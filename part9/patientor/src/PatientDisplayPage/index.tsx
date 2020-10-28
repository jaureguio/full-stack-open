import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import {
  Diagnosis,
  Patient,
  Entry,
  EntryFormValues,
} from '../types';

import { apiBaseUrl } from '../constants';
import {
  useStateValue,
  setPatient,
  setDiagnoses,
  addEntry
} from '../state';

import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';

const PatientDisplay: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ displayedPatients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [patientError, setPatientError] = useState<string>('');
  const [entryError, setEntryError] = useState<string>('');

  const openModal = (): void => setModalOpen(true);
  
  const closeModal = (): void => {
    setModalOpen(false);
    setEntryError('');
  };

  const submitNewEntry = async (inputs: EntryFormValues) => {
    try {
      const { data: addedEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, inputs);
      dispatch(addEntry({ entry: addedEntry, id }));
      closeModal();
    } catch(error) {
      const newError = error as Error;
      console.log(newError);
      setEntryError(newError.message);
    }
  };

  const patient = displayedPatients[id];
  
  useEffect(() => {
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
          setPatientError(error.message);
        }
      };
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  if(patientError) {
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
      <Button
        color='teal'
        onClick={openModal}
      >
        Add new entry
      </Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={entryError}
        onClose={closeModal}
        />
      {patient.entries.map((entry: Entry) => <EntryDetails key={entry.id} entry={entry} />)}
    </div>
  );
};

export default PatientDisplay;