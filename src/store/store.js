import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/usersReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: usersReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
const persistor = persistStore(store);

export { store, persistor };
