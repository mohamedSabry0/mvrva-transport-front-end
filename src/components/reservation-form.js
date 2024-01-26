/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createReservation } from '../redux/reservationsSlice';

function ReservationForm() {
  const [validated, setValidated] = useState(false);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    pickup_address: '',
    drop_address: '',
    description: '',
    contact: '',
    pickup_date: '',
    service_id: '',
  });

  // Fetch services when component mounts
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/services')
      .then((response) => response.json())
      .then((data) => setServices(data.services));
  }, []);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(createReservation(formData));

      // Clear the form
      setFormData({
        pickup_address: '',
        drop_address: '',
        description: '',
        contact: '',
        pickup_date: '',
        service_id: '',
      });
      setValidated(false);
    }

    setValidated(true);
  };

  return (
    // ...
    // Use the formData state variable and the handleChange function in your form controls
    <Form.Control required type="text" placeholder="Pickup Address" className="form-control" name="pickup_address" value={formData.pickup_address} onChange={handleChange} />
    // ...
  );
}

export default ReservationForm;
