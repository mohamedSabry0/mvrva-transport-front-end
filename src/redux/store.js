import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import serviceDetailsReducer from './serviceDetailsSlice';
import reservationsReducer from './reservationsSlice';

const store = configureStore({
  reducer: {
    services: servicesReducer,
    serviceDetails: serviceDetailsReducer,
    reservations: reservationsReducer,
  },
});

export default store;
