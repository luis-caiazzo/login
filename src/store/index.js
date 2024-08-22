import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../modules/auth/redux/authSlice";

const reducers = combineReducers({
  auth: authSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware({ serializableCheck: false })
      : getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
