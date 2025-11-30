import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import patentesReducer from "./slices/patentes/patentesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patentes: patentesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export default store;
