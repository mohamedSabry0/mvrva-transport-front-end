import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import { createReservation } from '../redux/reservationsSlice';

const ReservationForm = () => {
  const selectedService = useSelector((state) => state.selectedService);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    dispatch(createReservation(data));

    // Clear the form
    form.reset();
  };

  if (!selectedService) {
    return <div>No service selected</div>;
  }

  return (
    <Form className="ml-5" onSubmit={handleSubmit}>
      <h3>Selected Service:</h3>
      <p>
        Name:
        {' '}
        {userName || 'User'}
      </p>
      <Row>
        <Col>
          <Form.Group controlId="pickupAddress">
            <Form.Label>Pickup Address</Form.Label>
            <Form.Control required type="text" placeholder="Enter Pickup Address" name="pickup_address" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="dropAddress">
            <Form.Label>Drop Address</Form.Label>
            <Form.Control required type="text" placeholder="Enter Drop Address" name="drop_address" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="contact">
            <Form.Label>Contact</Form.Label>
            <Form.Control required type="text" placeholder="Enter Contact" name="contact" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="pickupDate">
            <Form.Label>Pickup Date</Form.Label>
            <Form.Control required type="date" placeholder="Enter Pickup Date" name="pickup_date" />
          </Form.Group>
        </Col>
        <Form.Control type="hidden" name="description" value={selectedService.description} />
      </Row>
      <p>
        Description:
        {' '}
        {selectedService.description}
      </p>
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
