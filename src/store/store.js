import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/usersReducer";

const rootReducer = combineReducers({
  users: usersReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
