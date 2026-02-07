import { configureStore } from "@reduxjs/toolkit";
import authenticationreducer from "./Authentication/AuthSlice";
import projectReducer from "./Projects/ProjectSlice";
import teamReducer from "./Teams/TeamsSlice";
import tasksReducer from "./Tasks/TasksSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const projectPersistConfig = {
  key: "projects",
  storage,
};

const teamPersistConfig = {
  key: "teams",
  storage,
};

const tasksPersistConfig = {
  key: "tasks",
  storage,
};

const persistedProjectReducer = persistReducer(projectPersistConfig, projectReducer);
const persistedTeamReducer = persistReducer(teamPersistConfig, teamReducer)
const persistedTasksReducer = persistReducer(tasksPersistConfig, tasksReducer);

export const store = configureStore({
  reducer: {
    authentication: authenticationreducer,
    projects: persistedProjectReducer,
    teams: persistedTeamReducer,
    tasks: persistedTasksReducer,
  },
});

export const persistor = persistStore(store);