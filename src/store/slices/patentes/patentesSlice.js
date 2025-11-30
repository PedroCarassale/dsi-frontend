import { createSlice } from "@reduxjs/toolkit";
import { getPatentes } from "./patentesActions";

const initialState = {
  patentes: [],
  loading: false,
  error: null,
};

const patentesSlice = createSlice({
  name: "patentes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default patentesSlice.reducer;
