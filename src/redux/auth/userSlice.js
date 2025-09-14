import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  users: [],
  isLoading: false,
  selectedUser: {},
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      const { payload } = action;
      state.isAuthenticated = payload;
    },
    clearUser: (state) => {
      state.user = {};
      state.isLoading = false;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;

export const {
  setUser,
  setUsers,
  setSelectedUser,
  setIsLoading,
  setIsAuthenticated,
  clearUser,
} = actions;
export default userReducer;
