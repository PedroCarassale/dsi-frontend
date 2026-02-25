import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../../services/api";

const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("📤 Enviando credenciales:", credentials);
      const response = await postRequest("/auth/login", credentials);
      console.log("✅ Respuesta del login:", response.data);
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    } catch (error) {
      console.error("❌ Error en login:", error);
      return rejectWithValue(
        error.response?.data?.message || "Error al iniciar sesión"
      );
    }
  }
);

export { login };
