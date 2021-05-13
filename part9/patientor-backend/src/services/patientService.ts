import patientData from "../../data/patients.json";
import { Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";
const id = uuid();

const getEntries = (): Omit<Patient, "ssn">[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id,
    ...patient,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
};
