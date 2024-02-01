import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  entities: [],
  loading: 'idle',
  error: null,
  isSuccess: false,
  isError: false,
  message: '',
};

export const createReservation = createAsyncThunk(
  'reservations/create',
  async (reservation, { rejectWithValue }) => {
    const localuser = JSON.parse(localStorage.getItem('user'));
    const token = localuser && localuser.Authorization;

    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/reservations',
        { reservation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchReservations = createAsyncThunk(
  'reservations/fetch',
  async (_, { rejectWithValue }) => {
    const localuser = JSON.parse(localStorage.getItem('user'));
    const token = localuser && localuser.Authorization;

    try {
      const response = await axios.get('http://localhost:4000/api/v1/reservations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteReservation = createAsyncThunk(
  'reservations/delete',
  async (reservationId, { rejectWithValue }) => {
    const localuser = JSON.parse(localStorage.getItem('user'));
    const token = localuser && localuser.Authorization;

    try {
      await axios.delete(`http://localhost:4000/api/v1/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return reservationId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities.push(action.payload);
        state.isSuccess = true;
        state.message = 'Reservation created successfully';
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
        state.isError = true;
        state.message = action.payload.message;
        state.isSuccess = false;
      })
      .addCase(fetchReservations.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(deleteReservation.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities = state.entities.filter((reservation) => reservation.id !== action.payload);
        state.isSuccess = true;
        state.message = 'Reservation deleted successfully';
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
        state.isError = true;
        state.message = action.payload.message;
        state.isSuccess = false;
      });
  },
});

export default reservationsSlice.reducer;
