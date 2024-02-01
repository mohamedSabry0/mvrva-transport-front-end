import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './service/servicesSlice';
import serviceDetailsReducer from './service/serviceDetailsSlice';
import authReducer from './auth/authSlice';
import reservationsReducer from './reservationsSlice';

const store = configureStore({
  reducer: {
    services: servicesReducer,
    serviceDetails: serviceDetailsReducer,
    reservations: reservationsReducer,
    auth: authReducer,
  },
});

export default store;
