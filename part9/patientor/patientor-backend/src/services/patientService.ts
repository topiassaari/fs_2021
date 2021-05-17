import patients from "../../data/patients";
import { Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";
const id = uuid();

const getEntries = (): Omit<Patient, "ssn">[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getEntry = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id,
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
  getEntry,
};
