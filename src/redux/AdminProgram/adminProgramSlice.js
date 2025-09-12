import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  program: {},
  programs: [],
  isLoading: false,
};
const adminProgramSlice = createSlice({
  name: "adminProgram",
  initialState,
  reducers: {
    setProgram: (state, action) => {
      state.program = action.payload;
      state.isLoading = false;
    },
    setPrograms: (state, action) => {
      state.programs = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
const { reducer: adminProgramReducer, actions } = adminProgramSlice;

export const { setProgram, setPrograms, setIsLoading } = actions;
export default adminProgramReducer;
