import axios from "axios";
// VITE_APP_API_BASE_URL = "http://localhost/stem-backend"
// Server URL
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Enroll | POST
export const enrollUser = async (userObj) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(
      `${API_URL}/features/program/enroll.php`,
      userObj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllEnrollmentsForUser = async (token, userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/features/program/enroll.php?user_enrollments=1&user_id=${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    throw error;
  }
};

export const updateEnrollmentStatus = async (
  token,
  userId,
  programId,
  status
) => {
  try {
    const response = await axios.put(
      `${API_URL}/features/program/enroll.php`,
      { user_id: userId, program_id: programId, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating enrollment status:", error);
    throw error;
  }
};
