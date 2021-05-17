import {
  NewPatient,
  Gender,
  Entry,
  Diagnose,
  NewBaseEntry,
  HealthCheckRating,
  SickLeave,
  Discharge,
  NewEntry,
  Type,
} from "./types";

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  occupation: unknown;
  ssn: unknown;
  gender: unknown;
};
type BaseEntryFields = {
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  type?: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  occupation,
  ssn,
  gender,
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
  };

  return newPatient;
};
const toNewBaseEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
}: BaseEntryFields): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    date: parseDate(date),
    description: parseDescription(description),
    specialist: parseSpecialist(specialist),
  };

  if (diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }
  return newBaseEntry;
};

export const toNewEntry = (entry: any): NewEntry => {
  const newBaseEntry = toNewBaseEntry(entry) as Entry;

  switch (newBaseEntry.type) {
    case Type.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    case Type.Hospital:
      return { ...newBaseEntry, discharge: parseDischarge(entry.discharge) };
    case Type.OccupationalHealthCare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseEmployer(entry.employerName),
      };

      if (entry.sickLeave) {
        newEntry.sickLeave = parseSickLeave(entry.sickLeave);
      }

      return newEntry;
    default:
      return newBaseEntry;
  }
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("name missing or not string");
  }
  return name;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("date missing or not string");
  }
  return date;
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

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("description missing or not string");
  }
  return description;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("specialist missing or not string");
  }
  return specialist;
};
const parseEmployer = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error("employer missing or not string");
  }
  return employer;
};
const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("criteria missing or not string");
  }
  return criteria;
};
const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw new Error("sick leave missing");
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error("discharge missing");
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnose["code"]> => {
  if (!diagnosisCodes || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error("diagnosisCodes missing");
  }
  return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("health check rating missing or wrong");
  }
  return healthCheckRating;
};
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const isArrayOfStrings = (array: unknown): array is Array<string> => {
  return array instanceof Array;
};
