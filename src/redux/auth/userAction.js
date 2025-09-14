import { toast } from "react-toastify";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateLearner,
  updateUser,
} from "../../axios/authaxios";
import {
  setIsAuthenticated,
  setIsLoading,
  setUser,
  setUsers,
} from "./userSlice";

// UI --------[ACTION]--------API-------comes with response-----dispatch actions

// Login Action
export const loginUserAction = (userObject) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await loginUser(userObject);

    console.log("loginUserAction result:", result);

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }

    //  Save token to localStorage
    if (result.access_token) {
      localStorage.setItem("accessToken", result.access_token);
    }

    // save user info
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
    }

    dispatch(setIsAuthenticated(true));
    dispatch(setUser(result.user));

    toast.success(result.message);
  } catch (err) {
    console.log("Login error details:", err);
    const errorMessage =
      err.response?.data?.error ||
      err.response?.data?.message ||
      err.message ||
      "An unexpected error occurred";

    toast.error(errorMessage);
  } finally {
    dispatch(setIsLoading(false));
  }
};

//create user action
export const createUserAction = (userObj) => async (dispatch) => {
  try {
    // call axios
    dispatch(setIsLoading(true));
    const result = await createUser(userObj);

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }

    toast.success(result.message);
    dispatch(getAllUsersAction());
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setIsLoading(false));
  }
};

//get a user details by id | admin
export const getUserByIdAction = (id) => async (dispatch) => {
  try {
    //call axios
    dispatch(setIsLoading(true));
    const token = localStorage.getItem("accessToken");
    const result = await getUserById(id, token);
    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }
    dispatch(setUser(result));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

// update user action| admin
export const updateUserAction = (id, userObj) => async (dispatch) => {
  try {
    // call axios
    dispatch(setIsLoading(true));
    const token = localStorage.getItem("accessToken");

    // Fixed parameter order to match the updateUser function
    const result = await updateUser(id, userObj, token);

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }

    toast.success("User updated successfully");
    dispatch(getAllUsersAction()); // Refresh the users list
  } catch (err) {
    console.log(err);
    toast.error("An unexpected error occurred");
  } finally {
    dispatch(setIsLoading(false));
  }
};

//get all users action

export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const token = localStorage.getItem("accessToken");
    const result = await getAllUsers(token);

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }
    dispatch(setUsers(result.users));
  } catch (err) {
    console.error("Get all users action error:", err);
    toast.error("Failed to fetch users");
  } finally {
    dispatch(setIsLoading(false));
  }
};

//delete user action
export const deleteUserAction = (id) => async (dispatch) => {
  try {
    // call axios
    dispatch(setIsLoading(true));
    const token = localStorage.getItem("accessToken");
    const result = await deleteUser(id, token);

    if (result?.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }
    toast.success(result.message);
    dispatch(getAllUsersAction());
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setIsLoading(false));
  }
};

// logout action
export const logoutUserAction = () => (dispatch) => {
  dispatch(setIsAuthenticated(false));
  dispatch(setUser(null));
  // delete token from local storage
  localStorage.removeItem("accessToken");
  toast.success("Logged out successfully");
};

// update admin data
export const userUpdateAdminAction = (adminData) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const token = localStorage.getItem("accessToken");
    const result = await updateUser(adminData.id, adminData, token);
    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }
    toast.success(result.message);
    dispatch(setUser(result.user));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setIsLoading(false));
  }
};

// update learner user details
export const userUpdateLearnerAction = (learnerData) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const token = localStorage.getItem("accessToken");

    const result = await updateLearner(learnerData, token);

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }

    toast.success(result.message);
    dispatch(setUser(result.user));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setIsLoading(false));
  }
};
