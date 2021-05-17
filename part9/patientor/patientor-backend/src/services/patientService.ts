import patients from "../../data/patients";
import { Patient, NewPatient, Entry, NewEntry } from "../types";
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

const addEntry = (id: string, newEntry: NewEntry): Patient | undefined => {
  let patient = patients.find((p) => p.id === id);
  const entry: Entry = { ...newEntry, id: uuid() };
  if (patient) {
    patient = {
      ...patient,
      entries: patient?.entries?.concat(entry),
    };
    patients.concat(patient);
    return patient;
  } else {
    return undefined;
  }
};

export default {
  getEntries,
  addPatient,
  getEntry,
  addEntry,
};
