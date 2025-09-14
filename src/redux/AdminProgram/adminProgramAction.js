import { toast } from "react-toastify";
import {
  createProgram,
  deleteProgram,
  getPrograms,
  updateProgram,
} from "../../axios/programaxios";
import { setIsLoading, setProgram, setPrograms } from "./adminProgramSlice";

// getallPrograms
export const getAllProgramsAction = () => async (dispatch) => {
  try {
    //call axios
    dispatch(setIsLoading(true));
    const result = await getPrograms();
    // console.log("getAllProgramsAction result:", result);
    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }
    dispatch(setPrograms(result));
    toast.success(result.message);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};
//get a program details by id
export const getProgramByIdAction = (id) => async (dispatch) => {
  try {
    //call axios
    dispatch(setIsLoading(true));
    const result = await getPrograms(id);
    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }
    dispatch(setProgram(result));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

// createProgramAction
export const createProgramAction = (programObj) => async (dispatch) => {
  try {
    // call axios
    dispatch(setIsLoading(true));
    const token = localStorage.getItem("accessToken");
    const result = await createProgram(programObj, token);

    // console.log("createProgramAction result:", result);

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }

    toast.success(result.message);
    dispatch(getAllProgramsAction());
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setIsLoading(false));
  }
};

// updateProgramAction
export const updateProgramAction = (programObj, id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const token = localStorage.getItem("accessToken");
    const result = await updateProgram(programObj, id, token);

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }

    toast.success(result.message);
    dispatch(getAllProgramsAction());
  } catch (err) {
    console.log(err);
    toast.error("Error updating program");
  } finally {
    dispatch(setIsLoading(false));
  }
};
// deleteProgramAction
export const deleteProgramAction = (id) => async (dispatch) => {
  try {
    // call axios
    dispatch(setIsLoading(true));
    const token = localStorage.getItem("accessToken");
    const result = await deleteProgram(id, token);

    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }
    toast.success(result.message);
    dispatch(getAllProgramsAction());
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setIsLoading(false));
  }
};
