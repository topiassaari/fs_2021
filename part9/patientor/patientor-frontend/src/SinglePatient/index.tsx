import { useParams } from "react-router-dom";
import { useStateValue, getPatientInfo } from "../state";
import React from "react";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import axios from "axios";

const SinglePatient = () => {
  const [{ patientInfo }, dispatch] = useStateValue();
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

  return patientInfo ? (
    <div className="App">
      <h1>
        {patientInfo.name} <Icon name={checkGender()} />
      </h1>
      <p>dob: {patientInfo.dateOfBirth}</p>
      <p>occupation: {patientInfo.occupation}</p>
    </div>
  ) : null;
};

export default SinglePatient;
