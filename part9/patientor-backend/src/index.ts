import express from 'express';
import cors from 'cors';

import { diagnosesData } from '../data/diagnoses';
import { patientsData } from '../data/patients';
import { Diagnose, Patient, PublicPatient, Entry } from "./utils/types";
import { toValidPatient, toPublicPatient, toValidEntry} from './utils/typeValidators';

const app = express();
const PORT = 3001;

const diagnoses: Diagnose[] = diagnosesData;
const publicPatients: PublicPatient[] = patientsData.map(toPublicPatient);

// eslint-disable-next-line
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.json(diagnoses);
});

app
  .route('/api/patients/:id/entries')
  .post((req, res) => {
    const patientId: string = req.params.id;
    const patientFromApi: Patient | undefined = patientsData.find(({ id }) => patientId === id);

    if(!patientFromApi) {
      return res.status(404).json({ error: 'patient not found' });
    }

    try {
      const newEntry = toValidEntry(req.body) as Entry;
      patientFromApi.entries.push(newEntry);
      return res.status(201).json(patientFromApi.entries[patientFromApi.entries.length - 1]);
    } catch (error) {
      const newError = error as Error;
      return res.status(404).json({ error: newError.message });
    }  
  });

app
  .route('/api/patients/:id')
  .get((req, res) => {
    const { id: requestedPatient } = req.params;
    const patient: Patient | undefined = patientsData.find(({ id }) => requestedPatient === id);

    if(!patient) {
      res.status(404).json({ error: 'patient not found' });
    } else {
      res.json(patient);
    }
  });

app
  .route('/api/patients')
  .get((_req, res) => {
    res.json(publicPatients);
  })
  .post((req, res) => {
    try {
      const addedPatient: Patient = toValidPatient(req.body);
      // Excess property checks not enforced here, and it should!, for example, a type Patient should not be pushed to the publicPatients array
      publicPatients.push(toPublicPatient(addedPatient));
      
      res.status(201).json(publicPatients[publicPatients.length - 1]);
    } catch (error) {
      const newError = error as Error;
      res.status(404).json({ error: newError.message });
    }
  });

app.listen(PORT, () => {
  console.log(`Server listening in port: ${PORT}`);
});