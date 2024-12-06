import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "./heroSlice"; // Adjust path as needed

const store = configureStore({
  reducer: {
    hero: heroReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Disable the serializability check
    })
});

export default store;
