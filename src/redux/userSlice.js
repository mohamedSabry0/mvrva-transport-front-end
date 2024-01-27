import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/current_user', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
});

export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
  const response = await axios.post('http://localhost:3000/login', credentials);
  console.log(response.data);
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('userId', user.id);
  console.log('Stored user ID:', user.id);
  return user;
});

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  console.log('Retrieved user ID:', userId);
  if (!userId) {
    console.error('User ID is null or undefined');
    return null;
  }
  const response = await axios.get(`http://localhost:3000/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response.data);
  return response.data;
});

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => (state.auth.user ? state.auth.user.user : null);
export default userSlice.reducer;
