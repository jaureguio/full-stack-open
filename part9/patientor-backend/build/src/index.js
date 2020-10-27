"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = require("../data/diagnoses");
const patients_1 = require("../data/patients");
const typeValidators_1 = require("./utils/typeValidators");
const app = express_1.default();
const PORT = 4001;
const diagnoses = diagnoses_1.diagnosesData;
const publicPatients = patients_1.patientsData.map(typeValidators_1.toPublicPatient);
// eslint-disable-next-line
app.use(cors_1.default());
app.use(express_1.default.json());
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.get('/api/diagnoses', (_req, res) => {
    res.json(diagnoses);
});
app
    .route('/api/patients')
    .get((_req, res) => {
    res.json(publicPatients);
})
    .post((req, res) => {
    try {
        const addedPatient = typeValidators_1.toValidPatient(req.body);
        // Excess property checks not enforced here, and it should!, for example, a type Patient should not be pushed to the publicPatients array
        publicPatients.push(typeValidators_1.toPublicPatient(addedPatient));
        res.status(201).json(publicPatients[publicPatients.length - 1]);
    }
    catch (error) {
        const newError = error;
        res.status(404).json({ error: newError.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server listening in port: ${PORT}`);
});
