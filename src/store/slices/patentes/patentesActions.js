import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../../../services/api";

// Obtener todas las patentes
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

// Crear una nueva patente
const createPatente = createAsyncThunk(
  "patentes/createPatente",
  async (patenteData, { rejectWithValue }) => {
    try {
      const response = await postRequest("/patents", patenteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al crear la patente"
      );
    }
  }
);

// Actualizar una patente existente
const updatePatente = createAsyncThunk(
  "patentes/updatePatente",
  async ({ id, ...patenteData }, { rejectWithValue }) => {
    try {
      const response = await putRequest(`/patents/${id}`, patenteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al actualizar la patente"
      );
    }
  }
);

// Eliminar una patente
const deletePatente = createAsyncThunk(
  "patentes/deletePatente",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRequest(`/patents/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al eliminar la patente"
      );
    }
  }
);

export { getPatentes, createPatente, updatePatente, deletePatente };
