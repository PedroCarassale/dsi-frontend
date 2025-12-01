import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../../../services/api";

// Obtener todas las memorias
const getMemorias = createAsyncThunk(
  "memorias/getMemorias",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("/memories");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener las memorias"
      );
    }
  }
);

// Crear una nueva memoria
const createMemoria = createAsyncThunk(
  "memorias/createMemoria",
  async (memoriaData, { rejectWithValue }) => {
    try {
      const response = await postRequest("/memories", memoriaData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al crear la memoria"
      );
    }
  }
);

// Actualizar una memoria existente
const updateMemoria = createAsyncThunk(
  "memorias/updateMemoria",
  async ({ id, ...memoriaData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(`/memories/${id}`, memoriaData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al actualizar la memoria"
      );
    }
  }
);

// Eliminar una memoria
const deleteMemoria = createAsyncThunk(
  "memorias/deleteMemoria",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRequest(`/memories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al eliminar la memoria"
      );
    }
  }
);

export { getMemorias, createMemoria, updateMemoria, deleteMemoria };

