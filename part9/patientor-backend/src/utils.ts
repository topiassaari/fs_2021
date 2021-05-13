import { NewPatient, Gender } from "./types";

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  occupation: unknown;
  ssn: unknown;
  gender: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  occupation,
  ssn,
  gender,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDoB(dateOfBirth),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
  };

  return newPatient;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("name missing or not string");
  }
  return name;
};
const parseDoB = (dob: unknown): string => {
  if (!dob || !isString(dob)) {
    throw new Error("date of birth missing or not string");
  }
  return dob;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("occupation missing or not string");
  }
  return occupation;
};
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("social security number missing or not string");
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("gender missing or not of value: male/female/other");
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatient;
