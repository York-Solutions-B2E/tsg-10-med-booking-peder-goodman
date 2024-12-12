// Import redux tools
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

// Import persist reducer tools
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// Import reducers
import userReducer from "./reducers/userReducer";
import medicalOptionsReducer from "./reducers/medicalOptionsReducer";

// combine all reducers in store
const rootReducer = combineReducers({
  user: userReducer, // admin or user details
  medicalOptions: medicalOptionsReducer, // list of doctors and specialties and availability
});

// configure persistent store
const persistentConfig = {
  key: "root",
  storage: storage,
};

// create a persisted reducer
const persistedReducer = persistReducer(persistentConfig, rootReducer);

// export store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
