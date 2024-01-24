// ServiceDetails.js
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchServiceDetails } from './serviceDetailsSlice';

const ServiceDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const service = useSelector((state) => state.serviceDetails.data);
  const status = useSelector((state) => state.serviceDetails.status);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          await dispatch(fetchServiceDetails(id));
        }
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchDetails();
  }, [dispatch, id]);

  if (!id || status === 'loading' || !service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="showcase">
      <Link to="/api/v1/services">
        <button type="button">Go Back</button>
      </Link>
      <h1>Show here</h1>
      <h2>{service.name}</h2>
      <p>
        Description:
        {service.description}
      </p>
      <p>
        Min Cost: $
        {service.min_cost}
      </p>
      <img src={service.image} alt="service" />
      {/* Add more details as needed */}
    </div>
  );
};

ServiceDetails.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

ServiceDetails.defaultProps = {
  params: {},
};

export default ServiceDetails;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchServiceDetails = createAsyncThunk(
  'serviceDetails/fetchServiceDetails',
  async (serviceId) => {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/v1/services/${serviceId}`,
    );
    return response.data.service;
  },
);

const serviceDetailsSlice = createSlice({
  name: 'serviceDetails',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServiceDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchServiceDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default serviceDetailsSlice.reducer;
