import { createSlice } from "@reduxjs/toolkit";
import {
  getTrabajos,
  createTrabajo,
  updateTrabajo,
  deleteTrabajo,
} from "./trabajosActions";

const initialState = {
  trabajos: [],
  loading: false,
  error: null,
};

const trabajosSlice = createSlice({
  name: "trabajos",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Trabajos
      .addCase(getTrabajos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrabajos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.trabajos = payload;
      })
      .addCase(getTrabajos.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Create Trabajo
      .addCase(createTrabajo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTrabajo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.trabajos.push(payload);
      })
      .addCase(createTrabajo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Update Trabajo
      .addCase(updateTrabajo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrabajo.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.trabajos.findIndex((t) => t.id === payload.id);
        if (index !== -1) {
          state.trabajos[index] = payload;
        }
      })
      .addCase(updateTrabajo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Delete Trabajo
      .addCase(deleteTrabajo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTrabajo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.trabajos = state.trabajos.filter((t) => t.id !== payload);
      })
      .addCase(deleteTrabajo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearError } = trabajosSlice.actions;
export default trabajosSlice.reducer;

