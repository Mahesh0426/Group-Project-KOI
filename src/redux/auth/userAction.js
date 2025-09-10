import { toast } from "react-toastify";
import { loginUser } from "../../axios/authaxios";
import { setIsAuthenticated, setIsLoading, setUser } from "./userSlice";

// UI --------[ACTION]--------API-------comes with response-----dispatch actions

// Login Action
export const loginUserAction = (userObject) => async (dispatch) => {
  try {
    // call axios
    dispatch(setIsLoading(true));
    const result = await loginUser(userObject);
    console.log("Login response:", result);

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }

    dispatch(setIsAuthenticated(true));
    dispatch(setUser(result.user));

    toast.success(result.message);
  } catch (err) {
    console.log(err);
  }
  dispatch(setIsLoading(false));
};
