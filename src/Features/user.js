import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  id: 0,
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
      sessionStorage.setItem("token", state.value.accessToken);
      sessionStorage.setItem("id", state.value.id);
      sessionStorage.setItem("username", state.value.username);
    },
    logout(state) {
      state.value = INITIAL_STATE;
      sessionStorage.clear();
    },
    keepLogged(state) {
      state.value.isLogged = true;
    },
  },
});

export const { login, logout, keepLogged, addItem } = userSlice.actions;

export default userSlice.reducer;
