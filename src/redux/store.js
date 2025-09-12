import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import adminProgramReducer from "./AdminProgram/adminProgramSlice";
import userProgramReducer from "./UserProgram/userProgramSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    adminProgram: adminProgramReducer,
    userProgram: userProgramReducer,
  },
});

export default store;
