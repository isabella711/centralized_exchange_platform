import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/usersReducer";
export default function configureAppStore(preloadedState) {
  const rootReducer = combineReducers({
    users: usersReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
}
