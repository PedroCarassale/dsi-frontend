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
      console.error("Error de login:", error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.status === 401 || error.response?.status === 400) {
        return rejectWithValue(
          error.response?.data?.message || "Credenciales inválidas"
        );
      } else if (error.response?.status === 404) {
        return rejectWithValue("Usuario no encontrado");
      } else if (error.response?.status === 500) {
        return rejectWithValue("Error en el servidor. Por favor intenta más tarde.");
      } else if (error.response?.status === 503) {
        return rejectWithValue("El servicio no está disponible. Por favor intenta más tarde.");
      } else if (!error.response) {
        return rejectWithValue(
          "No se pudo conectar con el servidor. Verifica tu conexión de internet."
        );
      } else {
        return rejectWithValue(
          error.response?.data?.message || "Error al iniciar sesión"
        );
      }
    }
  }
);

export { login };
