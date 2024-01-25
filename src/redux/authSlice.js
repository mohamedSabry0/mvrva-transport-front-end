import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Update loginUser to return an object containing both token and user data
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://127.0.0.1:3500/users/sign_in', {
      user: {
        email,
        password,
      },
    });

    // Assuming your server returns a token and user data on successful login
    const { Authorization: token, user } = response.data;

    // Save the token and user data in local storage or a secure cookie
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user }; // Return an object containing both token and user data
  } catch (error) {
    // Use rejectWithValue to pass the error message to the .rejected case
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    success: false,
    error: null,
    authToken: null,
    isAuthenticated: false,
    user: null, // Add this field to store user data
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.user = action.payload.user; // Store user data in the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.authToken = action.payload.token;
        state.isAuthenticated = true;
        state.user = action.payload.user; // Set user data in the state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong';
      });
  },
});

export const { setAuthToken } = authSlice.actions;

export default authSlice.reducer;
