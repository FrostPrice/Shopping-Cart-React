import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  name: "",
  quantity: "",
  price: 0,
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: { value: INITIAL_STATE },
  reducers: {
    addItem(state, action) {
      state.value = action.payload;
      console.log(state.value);
    },
  },
});

export const { addItem } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
