import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  isSuccess: false,
  error: null,
  message: '',
};

const localuser = JSON.parse(localStorage.getItem('user'));
const token = localuser && localuser.Authorization;

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await axios.get('http://127.0.0.1:4000/api/v1/services', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.services;
});

export const createService = createAsyncThunk('services/createService', async (serviceData) => {
  const response = await axios.post('http://127.0.0.1:4000/api/v1/services', serviceData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.service;
});

export const deleteService = createAsyncThunk('services/deleteService', async (serviceId) => {
  await axios.delete(`http://127.0.0.1:4000/api/v1/services/${serviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return serviceId;
});

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.message = 'Service created successfully';
        state.isSuccess = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.data = state.data.filter((service) => service.id !== action.payload);
        state.isSuccess = true;
        state.message = 'Service deleted successfully';
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.error = action.error.message;
        state.isSuccess = false;
        state.message = 'This service already has reservations. You cannot delete it.';
      });
  },
});

export default servicesSlice.reducer;
