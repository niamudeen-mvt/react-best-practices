import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authUser = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    updateAuthUser: (state) => {
      state.isLoggedIn = true;
    },
    userlogout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { updateAuthUser, userlogout } = authUser.actions;

export default authUser.reducer;
