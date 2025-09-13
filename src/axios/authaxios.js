import axios from "axios";
// VITE_APP_API_BASE_URL = "http://localhost/stem-backend"
// Server URL
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Signup | User Registration | Create | POST
export const createUser = (userObj) => {
  const response = axios
    .post(`${API_URL}/auth/register.php`, userObj)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Login | Post
export const loginUser = async (userObj) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login.php`, userObj, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Full error details:", error);
    console.log("Error response data:", error.response?.data);

    throw error; // Re-throw to handle in your component
  }
};

// Update User | PUT
export const updateUser = (userObj) => {
  const response = axios
    .put(`${API_URL}/user.php`, userObj)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Get User by ID | GET
export const getUserById = (id) => {
  const response = axios
    .get(`${API_URL}/user.php?id=${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Get All Users | GET
export const getAllUsers = () => {
  const response = axios
    .get(`${API_URL}/user.php`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Delete User | DELETE
export const deleteUser = (id) => {
  const response = axios
    .delete(`${API_URL}/user.php?id=${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};
