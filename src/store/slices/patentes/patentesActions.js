import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/api";

const getPatentes = createAsyncThunk(
  "patentes/getPatentes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("/patents");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener las patentes"
      );
    }
  }
);

export { getPatentes };
