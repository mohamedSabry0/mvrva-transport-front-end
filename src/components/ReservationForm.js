import React, { useState, useEffect } from 'react';
import {
  Button, Form, Row, Col, Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation, fetchReservations } from '../redux/reservationsSlice';
import { fetchServices } from '../redux/service/servicesSlice';

function ReservationForm() {
  const [validated, setValidated] = useState(false);
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.reservations);
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateString = tomorrow.toISOString().split('T')[0];

  const localUser = JSON.parse(localStorage.getItem('user'));
  const userName = localUser.user.name;

  useEffect(() => {
    dispatch(fetchReservations());

    dispatch(fetchServices()).then((response) => {
      if (response.payload) {
        setServices(response.payload);
      }
    });
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      const formData = new FormData(form);
      let data = Object.fromEntries(formData);

      if (data.service_id) {
        data = { ...data, service_id: Number(data.service_id), client_name: userName };
      }

      dispatch(createReservation(data)).then(() => {
        form.reset();
        setValidated(false);
        navigate('/my-reservations');
      });
    }
  };

  return (
    <>
      <section className="reservation-form">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <h2 className="mb-5">Reservation Form:</h2>
          <Row>
            <Col lg={4} md={7}>
              <Form.Group className="mb-3" controlId="pickupAddress">
                <Form.Control required type="text" placeholder="Pickup Address" className="form-control" name="pickup_address" />
              </Form.Group>
            </Col>
            <Col lg={4} md={7}>
              <Form.Group className="mb-3" controlId="dropAddress">
                <Form.Control required type="text" placeholder="Drop Address" className="form-control" name="drop_address" />
              </Form.Group>
            </Col>
            <Col lg={4} md={7}>
              <Form.Group className="mb-3" controlId="description">
                <Form.Control required type="text" placeholder="Description" className="form-control" name="description" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={7}>
              <Form.Group className="mb-3" controlId="contact">
                <Form.Control required type="text" placeholder="Contact" className="form-control" name="contact" />
              </Form.Group>
            </Col>
            <Col lg={4} md={7}>
              <Form.Group className="mb-3" controlId="pickupDate">
                <Form.Control required type="date" min={dateString} placeholder="Pickup Date" className="form-control" name="pickup_date" />
              </Form.Group>
            </Col>
            <Col lg={4} md={7}>
              <Form.Group className="mb-3" controlId="serviceId">
                <Form.Control as="select" required className="form-control" name="service_id">
                  <option value="">Select a service</option>
                  {Array.isArray(services)
                && services.map((service) => (
                  <option value={service.id} key={service.id}>
                    {service.name}
                  </option>
                ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" className="submit-btn" type="submit">
            Submit
          </Button>
          {error && <Alert variant="danger">{error}</Alert>}
          {validated && !error && (
          <Alert variant="danger">
            Your reservation has not been created. Please check the details properly.
          </Alert>
          )}
        </Form>
      </section>
    </>
  );
}

export default ReservationForm;
