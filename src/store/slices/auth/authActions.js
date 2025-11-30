import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../../services/api";

const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await postRequest("/auth/login", credentials);
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al iniciar sesión"
      );
    }
  }
);

export { login };
