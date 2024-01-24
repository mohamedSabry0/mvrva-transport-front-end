import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import registerReducer from './registerSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    services: servicesReducer,
    register: registerReducer,
    auth: authReducer,
  },
});

export default store;
