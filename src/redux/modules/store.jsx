import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../reducers/carSlice";

export default configureStore({
  reducer: {
    cars: carReducer,
  },
});
