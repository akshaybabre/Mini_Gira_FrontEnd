import { configureStore } from "@reduxjs/toolkit";
import authenticationreducer from "./Authentication/AuthSlice";
import projectReducer from "./Projects/ProjectSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const projectPersistConfig = {
  key: "projects",
  storage,
};

const persistedProjectReducer = persistReducer(projectPersistConfig, projectReducer);


export const store = configureStore({
  reducer: {
    authentication: authenticationreducer,
    projects: persistedProjectReducer ,
  },
});

export const persistor = persistStore(store);