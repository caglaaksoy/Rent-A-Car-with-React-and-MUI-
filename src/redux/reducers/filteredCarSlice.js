import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: [], // İlk değeri boş bir dizi olarak tanımlanıyor
};

const filteredCarSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelected(state, action) {
      state.cars = action.payload;
    },
  },
});

export const { setSelected } = filteredCarSlice.actions;
export default filteredCarSlice.reducer;
