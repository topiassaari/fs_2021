import { useParams } from "react-router-dom";
import { useStateValue, getPatientInfo } from "../state";
import React from "react";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import axios from "axios";

const SinglePatient = () => {
  const [{ patientInfo, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  if (id !== patientInfo.id) {
    React.useEffect(() => {
      const getPatient = async (id: string) => {
        try {
          const { data: fetchedPatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          console.log("user info fetched");
          dispatch(getPatientInfo(fetchedPatient));
        } catch (e) {
          console.error(e.response?.data || "Unknown Error");
        }
      };
      void getPatient(id);
    }, [dispatch]);
  }

  const checkGender = () => {
    switch (patientInfo.gender) {
      case "male":
        return "mars";
        break;
      case "female":
        return "venus";
      case "other":
        return "genderless";
      default:
        break;
    }
  };
  const DiagnosisDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
      <div>
        {entry.diagnosisCodes ? (
          <div>
            <h5>diagnosis codes</h5>
            <ul>
              {entry.diagnosisCodes.map((code) => {
                return (
                  <li key={code}>
                    {code} {diagnosis[code] ? diagnosis[code].name : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <div style={{ border: "1px solid black", padding: "8px" }}>
            <h3>
              {entry.date} <Icon name="hospital" />
            </h3>
            <p>
              <i>{entry.description}</i>
            </p>
            <p>
              Discharge: {entry.discharge.date} - {entry.discharge.criteria}
            </p>
            <DiagnosisDetails entry={entry} />
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div style={{ border: "1px solid black", padding: "8px" }}>
            <h3>
              {entry.date} <Icon name="stethoscope" /> {entry.employerName}
            </h3>
            <p>
              <i>{entry.description}</i>
            </p>
            {entry.sickLeave ?
            <p>
              Sick leave: {entry.sickLeave?.startDate} -{" "}
              {entry.sickLeave?.endDate}
            </p> : null}
            <DiagnosisDetails entry={entry} />
          </div>
        );
      case "HealthCheck":
        return (
          <div style={{ border: "1px solid black", padding: "8px" }}>
            <h3>
              {entry.date} <Icon name="doctor" />
            </h3>
            <p>
              <i>{entry.description}</i>
            </p>
            <p>Health check rating: {entry.healthCheckRating}</p>
            <DiagnosisDetails entry={entry} />
          </div>
        );
      default:
        return null;
    }
  };

  return patientInfo ? (
    <div className="App">
      <div>
        <h1>
          {patientInfo.name} <Icon name={checkGender()} />
        </h1>
        <p>dob: {patientInfo.dateOfBirth}</p>
        <p>occupation: {patientInfo.occupation}</p>
      </div>
      <div style={{ marginTop: "16px" }}>
        <h2>entries</h2>
        {patientInfo.entries.map((entry) => {
          return (
            <div key={entry.id}>
              <EntryDetails entry={entry} />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default SinglePatient;
