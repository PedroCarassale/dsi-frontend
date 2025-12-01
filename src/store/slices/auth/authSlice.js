import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authActions";

// Obtener token de localStorage si existe
const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  loading: false,
  error: null,
  token: tokenFromStorage,
  user: userFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Limpiar localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Resetear estado
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.access_token;
        state.user = payload.user;
        state.error = null;
        
        // Guardar en localStorage
        localStorage.setItem("token", payload.access_token);
        if (payload.user) {
          localStorage.setItem("user", JSON.stringify(payload.user));
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
