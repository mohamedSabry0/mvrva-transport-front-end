// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
// redux/userApi.js
import axios from 'axios';

export const fetchUser = async () => {
  const response = await axios.get('YOUR_USER_API_ENDPOINT'); // Replace with your actual API endpoint
  return response.data;
};

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
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
