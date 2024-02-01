import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchServiceDetails = createAsyncThunk(
  'serviceDetails/fetchServiceDetails',
  async (serviceId) => {
    const response = await axios.get(
      `http://127.0.0.1:4000/api/v1/services/${serviceId}`,
    );
    return response.data.service;
  },
);

const serviceDetailsSlice = createSlice({
  name: 'serviceDetails',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServiceDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchServiceDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default serviceDetailsSlice.reducer;
