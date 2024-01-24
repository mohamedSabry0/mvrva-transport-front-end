import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createReservation = createAsyncThunk(
  'reservations/create',
  async (reservation, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/reservations', { reservation });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: { entities: [], loading: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      });
  },
});

export default reservationsSlice.reducer;
