import diagnosisData from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = diagnosisData as Array<Diagnose>;

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getEntries,
};
