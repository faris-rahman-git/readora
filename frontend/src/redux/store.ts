import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Import slices
import loaderSlice from "./features/common/LoaderSlice";
import userSlice from "./features/auth/userSlice";

// Redux Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  blacklist: ["loader"],
};

// Root reducer
const rootReducer = combineReducers({
  user: userSlice,
  loader: loaderSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
