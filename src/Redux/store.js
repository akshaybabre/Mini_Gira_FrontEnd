import { configureStore } from "@reduxjs/toolkit";
import authenticationreducer from "./Authentication/AuthSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationreducer,
  },
});
