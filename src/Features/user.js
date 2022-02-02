import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  isLogged: false,
  accessToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: { value: INITIAL_STATE },
  reducers: {
    login(state, action) {
      state.value = action.payload;
      state.value.isLogged = true;
      localStorage.setItem("token", state.value.accessToken);
      localStorage.setItem("username", state.value.username);
    },
    logout(state) {
      state.value = {
        username: "",
        email: "",
        password: "",
        isLogged: false,
        accessToken: "",
      };
      localStorage.clear();
    },
    keepLogged(state) {
      state.value.isLogged = true;
    },
  },
});

export const { login, logout, keepLogged } = userSlice.actions;

export default userSlice.reducer;
