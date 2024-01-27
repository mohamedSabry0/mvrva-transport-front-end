import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import { createReservation } from '../redux/reservationsSlice';
import { fetchCurrentUser, selectUser } from '../redux/userSlice';

const ReservationForm = () => {
  const selectedService = useSelector((state) => state.selectedService);
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    pickup_address: '',
    drop_address: '',
    contact: '',
    pickup_date: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createReservation({
      reservation: {
        ...formData,
        service_id: selectedService.id,
        user_id: user.id,
      },
    }));
  };

  if (!selectedService) {
    return <div>No service selected</div>;
  }

  return (
    <Form className="ml-5" onSubmit={handleSubmit}>
      <h3 className="mb-2">Selected Service:</h3>
      <p className="mb-2">
        Name:
        {' '}
        {user ? user.name : 'User'}
      </p>
      <p className="mb-2">
        Description:
        {' '}
        {selectedService.description}
      </p>
      <Form.Control type="hidden" name="description" value={selectedService.description} />
      <Row>
        <Col>
          <Form.Group controlId="pickupAddress">
            <Form.Label>Pickup Address</Form.Label>
            <Form.Control required type="text" placeholder="Enter Pickup Address" name="pickup_address" value={formData.pickup_address} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="dropAddress">
            <Form.Label>Drop Address</Form.Label>
            <Form.Control required type="text" placeholder="Enter Drop Address" name="drop_address" value={formData.drop_address} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="contact">
            <Form.Label>Contact</Form.Label>
            <Form.Control required type="text" placeholder="Enter Contact" name="contact" value={formData.contact} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="pickupDate">
            <Form.Label>Pickup Date</Form.Label>
            <Form.Control required type="date" placeholder="Enter Pickup Date" name="pickup_date" value={formData.pickup_date} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>
      <p>
        Min Cost:
        {' '}
        $
        {selectedService.min_cost}
      </p>
      <Button type="submit" variant="success">
        Confirm Reservation
      </Button>
    </Form>
  );
};

export default ReservationForm;
