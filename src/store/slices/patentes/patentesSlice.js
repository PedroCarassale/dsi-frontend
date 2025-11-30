import { createSlice } from "@reduxjs/toolkit";
import {
  getPatentes,
  createPatente,
  updatePatente,
  deletePatente,
} from "./patentesActions";

const initialState = {
  patentes: [],
  loading: false,
  error: null,
};

const patentesSlice = createSlice({
  name: "patentes",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Patentes
      .addCase(getPatentes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPatentes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.patentes = payload;
      })
      .addCase(getPatentes.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Create Patente
      .addCase(createPatente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPatente.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.patentes.push(payload);
      })
      .addCase(createPatente.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Update Patente
      .addCase(updatePatente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatente.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.patentes.findIndex((p) => p.id === payload.id);
        if (index !== -1) {
          state.patentes[index] = payload;
        }
      })
      .addCase(updatePatente.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Delete Patente
      .addCase(deletePatente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatente.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.patentes = state.patentes.filter((p) => p.id !== payload);
      })
      .addCase(deletePatente.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearError } = patentesSlice.actions;
export default patentesSlice.reducer;
