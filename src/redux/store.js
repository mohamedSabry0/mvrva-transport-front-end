// store.js

import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import registerReducer from './registerSlice';
import authReducer from './authSlice';
import serviceDetailsReducer from './serviceDetailsSlice';
import memberReducer from './adminRouteSlice';

const store = configureStore({
  reducer: {
    services: servicesReducer,
    register: registerReducer,
    auth: authReducer,
    serviceDetails: serviceDetailsReducer,
    member: memberReducer,
  },
});

export default store;
