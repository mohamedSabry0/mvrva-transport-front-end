import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMemberDetails = createAsyncThunk(
  'member/fetchMemberDetails',
  async () => {
    const response = await fetch('http://localhost:3000/member_details');
    const data = await response.json();
    return data;
  },
);

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    roles: [],
    isAdmin: false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMemberDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload.roles;
        state.isAdmin = action.payload.roles.includes('admin');
      })
      .addCase(fetchMemberDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default memberSlice.reducer;
