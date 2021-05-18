import patients from "../../data/patients";
import { Patient, NewPatient, Entry, NewEntry } from "../types";
import { v1 as uuid } from "uuid";
const id = uuid();

const getPatients = (): Omit<Patient, "ssn">[] => {
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

const getPatient = (id: string): Patient | undefined => {
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

const addEntry = (id: string, newEntry: NewEntry): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  const entry: Entry = { ...newEntry, id: uuid() };
  if (patient) {
    const newPatient = {
      ...patient,
      entries: patient.entries?.concat(entry),
    };
    patients.concat(newPatient);
    return newPatient;
  } else {
    return undefined;
  }
};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry,
};
