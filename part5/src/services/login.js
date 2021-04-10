import axios from "axios";
const baseUrl = "/api/login";

const login = async (cred) => {
  const response = await axios.post(baseUrl, cred);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
