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

// Update User | PUT | admin setting
export const updateUser = (id, userObj, token) => {
  const response = axios
    .put(
      `${API_URL}/auth/admin_users.php`,
      { id, ...userObj },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return {
        status: "error",
        message: error.response?.data?.error || "Failed to update user",
      };
    });

  return response;
};

// Get User by ID | GET
export const getUserById = (id, token) => {
  const response = axios
    .get(`${API_URL}/auth/admin_users.php?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Get All Users | GET
export const getAllUsers = async (token) => {
  const response = await axios
    .get(`${API_URL}/auth/admin_users.php`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return response;
};

// Delete User | DELETE
export const deleteUser = (id, token) => {
  const response = axios
    .delete(`${API_URL}/auth/admin_users.php`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { id: id },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};
//update learner user details
export const updateLearner = async (userObj, token) => {
  console.log("token :", token);
  return axios
    .put(`${API_URL}/auth/profile.php`, userObj, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      return {
        status: "error",
        message: error.response?.data?.error || "Failed to update user",
      };
    });
};
