import { createSlice } from "@reduxjs/toolkit";
import {
  getMemorias,
  createMemoria,
  updateMemoria,
  deleteMemoria,
} from "./memoriasActions";

const initialState = {
  memorias: [],
  loading: false,
  error: null,
};

const memoriasSlice = createSlice({
  name: "memorias",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Memorias
      .addCase(getMemorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMemorias.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.memorias = payload;
      })
      .addCase(getMemorias.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Create Memoria
      .addCase(createMemoria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMemoria.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.memorias.push(payload);
      })
      .addCase(createMemoria.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Update Memoria
      .addCase(updateMemoria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMemoria.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.memorias.findIndex((m) => m.id === payload.id);
        if (index !== -1) {
          state.memorias[index] = payload;
        }
      })
      .addCase(updateMemoria.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Delete Memoria
      .addCase(deleteMemoria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMemoria.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.memorias = state.memorias.filter((m) => m.id !== payload);
      })
      .addCase(deleteMemoria.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearError } = memoriasSlice.actions;
export default memoriasSlice.reducer;
