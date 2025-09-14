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

  // Append all fields to FormData
  for (const key in programObj) {
    if (key === "learning_outcomes") {
      const outcomesArray = programObj[key]
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");
      formData.append(key, JSON.stringify(outcomesArray));
    } else if (key === "image_filename") {
      // Handle the file separately - PHP expects it as 'image'
      if (
        programObj.image_filename &&
        programObj.image_filename instanceof File
      ) {
        formData.append("image", programObj.image_filename);
      }
    } else if (programObj[key] !== null && programObj[key] !== undefined) {
      formData.append(key, programObj[key]);
    }
  }

  return axios
    .post(`${API_URL}/features/program/programs.php`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error creating program:", error.response?.data || error);
      throw error;
    });
};

// Program | POST (Update)
export const updateProgram = async (programObj, id, token) => {
  const formData = new FormData();

  // Add the ID to identify this as an update operation
  formData.append("id", id);

  // Append all fields to FormData (same logic as create)
  for (const key in programObj) {
    if (key === "learning_outcomes") {
      const outcomesArray = programObj[key]
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");
      formData.append(key, JSON.stringify(outcomesArray));
    } else if (key === "image_filename") {
      // Only append image if a new file was selected
      if (
        programObj.image_filename &&
        programObj.image_filename instanceof File
      ) {
        formData.append("image", programObj.image_filename);
      }
    } else if (programObj[key] !== null && programObj[key] !== undefined) {
      formData.append(key, programObj[key]);
    }
  }

  // Use POST instead of PUT to match your PHP backend
  return axios
    .post(`${API_URL}/features/program/programs.php`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error updating program:", error.response?.data || error);
      throw error;
    });
};

// Program | DELETE
export const deleteProgram = async (id, token) => {
  return axios
    .delete(`${API_URL}/features/program/programs.php`, {
      data: { id: id },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error deleting program:", error.response?.data || error);
      throw error;
    });
};
// Single Program | GET
export const getSingleProgram = (id) => {
  const response = axios
    .get(`${API_URL}/program.php?id=${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};
