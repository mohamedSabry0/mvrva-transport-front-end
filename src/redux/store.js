import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import serviceDetailsReducer from './serviceDetailsSlice';
import reservationsReducer from './reservationsSlice';
import memberReducer from './adminRouteSlice';

const store = configureStore({
  reducer: {
    services: servicesReducer,
    serviceDetails: serviceDetailsReducer,
    reservations: reservationsReducer,
    member: memberReducer,
  },
});

export default store;
