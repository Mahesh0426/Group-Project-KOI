import axios from "axios";
// VITE_APP_API_BASE_URL = "http://localhost/STEM_server"
// Server URL
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Program | GET
export const getPrograms = () => {
  const response = axios
    .get(`${API_URL}/features/program/programs.php`)
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

export const createProgram = async (programObj, token) => {
  const formData = new FormData();

  for (const key in programObj) {
    if (key === "learning_outcomes") {
      // Split textarea into array
      const outcomesArray = programObj[key]
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");
      formData.append(key, JSON.stringify(outcomesArray));
    } else if (key === "image" && programObj[key]) {
      formData.append("image", programObj[key]); //  append file
    } else {
      formData.append(key, programObj[key]);
    }
  }

  return axios
    .post(`${API_URL}/features/program/programs.php`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error creating program:", error.response?.data || error);
      throw error;
    });
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
