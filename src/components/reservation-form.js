import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createReservation } from '../redux/reservationsSlice';

function ReservationForm() {
  const [validated, setValidated] = useState(false);
  const [services, setServices] = useState([]);

  // Fetch services when component mounts
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/services')
      .then((response) => response.json())
      .then((data) => setServices(data.services));
  }, []);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      dispatch(createReservation(data));

      // Clear the form
      form.reset();
      setValidated(false);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-background d-flex flex-column justify-content-center align-items-center vh-100">
      <Row>
        <Col lg={4}>
          <Form.Group className="mb-3" controlId="pickupAddress">
            <Form.Control required type="text" placeholder="Pickup Address" className="form-control" name="pickup_address" />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group className="mb-3" controlId="dropAddress">
            <Form.Control required type="text" placeholder="Drop Address" className="form-control" name="drop_address" />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group className="mb-3" controlId="description">
            <Form.Control required type="text" placeholder="Description" className="form-control" name="description" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Form.Group className="mb-3" controlId="contact">
            <Form.Control required type="text" placeholder="Contact" className="form-control" name="contact" />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group className="mb-3" controlId="pickupDate">
            <Form.Control required type="date" placeholder="Pickup Date" className="form-control" name="pickup_date" />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group className="mb-3" controlId="serviceId">
            <Form.Control as="select" required className="form-control" name="service_id">
              <option value="">Select a service</option>
              {Array.isArray(services) && services.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ReservationForm;
