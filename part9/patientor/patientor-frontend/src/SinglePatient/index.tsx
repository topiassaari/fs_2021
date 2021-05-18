import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, NewEntry } from "../types";
import axios from "axios";
import AddEntryModal from "../AddEntryModal";

const SinglePatient = () => {
  const [{ currentPatient, diagnosis }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();

  const getPatientDetails = async (id: string) => {
    if (currentPatient.id !== id)
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log("user info fetched");
        dispatch(updatePatient(fetchedPatient));
      } catch (e) {
        console.error(e);
      }
  };
  React.useEffect(() => {
    void getPatientDetails(id);
  }, [id, dispatch]);

  const submitNewOccupationalHealthCare = async (entry: NewEntry) => {
    const newEntry = { ...entry };
    try {
      const { data: fetchedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
        newEntry
      );
      dispatch(updatePatient(fetchedPatient));
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  const checkGender = () => {
    switch (currentPatient.gender) {
      case "male":
        return "mars";
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
            {entry.sickLeave ? (
              <p>
                Sick leave: {entry.sickLeave?.startDate} -{" "}
                {entry.sickLeave?.endDate}
              </p>
            ) : null}
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

  return currentPatient ? (
    <div className="App">
      <div>
        <h1>
          {currentPatient.name} <Icon name={checkGender()} />
        </h1>
        <p>dob: {currentPatient.dateOfBirth}</p>
        <p>occupation: {currentPatient.occupation}</p>
      </div>
      <div style={{ marginTop: "16px" }}>
        <h2>entries</h2>
        {currentPatient.entries?.map((entry) => {
          return (
            <div key={entry.id}>
              <EntryDetails entry={entry} />
            </div>
          );
        })}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewOccupationalHealthCare}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={openModal}>
          Add New Occupational Health Care Entry
        </Button>
      </div>
    </div>
  ) : null;
};

export default SinglePatient;
