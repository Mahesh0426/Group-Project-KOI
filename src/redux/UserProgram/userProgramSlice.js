import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  programs: [],
  enrolledPrograms: [],
  isLoading: false,
};

const userProgramSlice = createSlice({
  name: "userProgram",
  initialState,
  reducers: {
    setPrograms: (state, action) => {
      state.programs = action.payload;
      state.isLoading = false;
    },
    setEnrolledPrograms: (state, action) => {
      state.enrolledPrograms = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
const { reducer: userProgramReducer, actions } = userProgramSlice;

export const { setPrograms, setEnrolledPrograms, setIsLoading } = actions;
export default userProgramReducer;
