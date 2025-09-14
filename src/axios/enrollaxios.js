import axios from "axios";
// VITE_APP_API_BASE_URL = "http://localhost/stem-backend"
// Server URL
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Enroll | POST
export const enrollUser = (userObj) => {
  const response = axios
    .post(`${API_URL}/features/program/enroll.php`, userObj)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Get All Enrolled Users | GET
export const getAllEnrolledUsers = async (token) => {
  const response = await axios
    .get(`${API_URL}/features/program/enroll.php`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return response;
};

//get a enrolled by id
export const getEnrolledById = async (id) => {
  const response = await axios
    .get(`${API_URL}/features/program/enroll.php?id=${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return response;
};
