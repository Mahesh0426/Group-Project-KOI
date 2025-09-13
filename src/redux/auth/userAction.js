import { toast } from "react-toastify";
import {
  deleteUser,
  getAllUsers,
  loginUser,
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

// update user action
export const updateUserAction = (userObj) => async (dispatch) => {
  try {
    // call axios
    dispatch(setIsLoading(true));
    const result = await updateUser(userObj);

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }

    dispatch(setUser(userObj));
    toast.success("User updated successfully");
    dispatch(getAllUsersAction());
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setIsLoading(false));
  }
};

//get all users action
export const getAllUsersAction = () => async (dispatch) => {
  try {
    // call axios
    dispatch(setIsLoading(true));
    const result = await getAllUsers();

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }

    dispatch(setUsers(result.users));

    toast.success(result.message);
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setIsLoading(false));
  }
};

//delete user action
export const deleteUserAction = (id) => async (dispatch) => {
  try {
    // call axios
    dispatch(setIsLoading(true));
    const result = await deleteUser(id);

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

// logout action
export const logoutUserAction = () => (dispatch) => {
  dispatch(setIsAuthenticated(false));
  dispatch(setUser(null));
  toast.success("Logged out successfully");
};
