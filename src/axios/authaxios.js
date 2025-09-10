import axios from "axios";
// VITE_APP_API_BASE_URL = "http://localhost/STEM_server"
// Server URL
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Signup | User Registration | Create | POST
export const createUser = (userObj) => {
  const response = axios
    .post(`${API_URL}/signup.php`, userObj)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Login | Post
export const loginUser = (userObj) => {
  const response = axios
    .post(`${API_URL}/login.php`, userObj)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};
