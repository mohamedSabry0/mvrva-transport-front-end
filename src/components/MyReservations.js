import { Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchReservations, deleteReservation } from '../redux/reservationsSlice';

const MyReservations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const reservations = useSelector((state) => state.reservations.entities);

  const deleteStatus = useSelector((state) => state.reservations.loading);

  const handleDeleteReservation = (reservationId) => {
    dispatch(deleteReservation(reservationId));
  };

  return (

    <div className="reservation-wrapper">
      <div className="reservation row">
        <h2 className="mb-5">Reservations</h2>
        {deleteStatus === 'loading' && <p>Deleting...</p>}
        {reservations.length === 0 ? (
          <p>No reservations available.</p>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation.id} className="mb-5 col-lg-4 col-md-6 col-sm-6 col-xsm-12 col-12">
              <Card style={{ width: '18rem' }}>
                <Card.Body className="reserve-card-body">
                  <Card.Title>
                    Service ID:
                    {' '}
                    {reservation.service_id || 'N/A'}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Description:
                    {' '}
                    {reservation.description || 'N/A'}
                  </Card.Subtitle>

                  <Card.Text>
                    Pickup Address:
                    {' '}
                    {reservation.pickup_address || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    Drop Address:
                    {' '}
                    {reservation.drop_address || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    Contact:
                    {' '}
                    {reservation.contact || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    Pickup Date:
                    {' '}
                    {reservation.pickup_date || 'N/A'}
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="submit-btn"
                    onClick={() => handleDeleteReservation(reservation.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReservations;
