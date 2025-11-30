import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import patentesReducer from "./slices/patentes/patentesSlice";
import trabajosReducer from "./slices/trabajos/trabajosSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patentes: patentesReducer,
    trabajos: trabajosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export default store;
