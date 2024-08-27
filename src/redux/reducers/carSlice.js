import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
  marka: [],
  vites: [],
  yakit: [],
  minFiyat: 0,
  maxFiyat: 99999990,
  minModelYili: 2000,
  maxModelYili: 2024,
  minKm: 0,
  maxKm: 99999990,
  renk: [],
  lokasyon: [],
  filteredCarCount: 0,
};

export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setMarka: (state, action) => {
      state.marka = action.payload;
    },

    setVites: (state, action) => {
      state.vites = action.payload;
    },
    setYakit: (state, action) => {
      state.yakit = action.payload;
    },

    setMinFiyat: (state, action) => {
      state.minFiyat = action.payload;
    },
    setMaxFiyat: (state, action) => {
      state.maxFiyat = action.payload;
    },

    setMinModelYili: (state, action) => {
      state.minModelYili = action.payload;
    },
    setMaxModelYili: (state, action) => {
      state.maxModelYili = action.payload;
    },
    setMinKm: (state, action) => {
      state.minKm = action.payload;
    },
    setMaxKm: (state, action) => {
      state.maxKm = action.payload;
    },
    setRenk: (state, action) => {
      state.renk = action.payload;
    },
    setLokasyon: (state, action) => {
      state.lokasyon = action.payload;
    },
    setFilteredCars: (state, action) => {
      state.filteredCars = action.payload;
    },
    setFilteredCarCount: (state, action) => {
      state.filteredCarCount = action.payload;
    },
  },
});

export const {
  setCars,
  setMarka,
  setVites,
  setYakit,
  setMinFiyat,
  setMaxFiyat,
  setMinModelYili,
  setMaxModelYili,
  setMinKm,
  setMaxKm,
  setRenk,
  setLokasyon,
  setFilteredCarCount,
} = carSlice.actions;

export default carSlice.reducer;
