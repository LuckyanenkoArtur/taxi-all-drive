import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const initialState = {
  token: token ? token : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      const { token } = payload;
      state.token = token;
      Cookies.set("token", token, {
        secure: true,
        expires: 1,
      });
    },
    logOut: (state, { payload }) => {
      Cookies.remove("token");
      state.token = null;
    },
  },
});

export const { logOut, setCredentials } = authSlice.actions;

export default authSlice.reducer;
