import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./features/auth.slice.js";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});
