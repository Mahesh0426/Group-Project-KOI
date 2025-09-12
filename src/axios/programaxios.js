import axios from "axios";
// VITE_APP_API_BASE_URL = "http://localhost/STEM_server"
// Server URL
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Program | GET
export const getPrograms = () => {
  const response = axios
    .get(`${API_URL}/program.php`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Program | GET by user id
export const getProgramsByUserId = (userId) => {
  const response = axios
    .get(`${API_URL}/program.php?userId=${userId}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Program | POST
export const createProgram = (programObj) => {
  const response = axios
    .post(`${API_URL}/program.php`, programObj)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};
// Program | PUT
export const updateProgram = (programObj, id) => {
  const response = axios
    .put(`${API_URL}/program.php?id=${id}`, programObj)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};
// Program | DELETE
export const deleteProgram = (id) => {
  const response = axios
    .delete(`${API_URL}/program.php?id=${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};
// Single Program | GET
export const getSingleProgram = (id) => {
  const response = axios
    .get(`${API_URL}/program.php?id=${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};
