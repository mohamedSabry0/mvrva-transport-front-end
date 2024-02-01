import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { fetchServiceDetails } from '../../redux/service/serviceDetailsSlice';

const ServiceDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const service = useSelector((state) => state.serviceDetails.data);
  const status = useSelector((state) => state.serviceDetails.status);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          await dispatch(fetchServiceDetails(id));
        }
      } catch (error) {
        throw new Error(`Error fetching service details: ${error}`);
      }
    };

    fetchDetails();
  }, [dispatch, id]);

  const handleReserveClick = () => {
    navigate(`/service/${id}/reservation`);
  };

  if (!id || status === 'loading' || !service) {
    return <h1 className="text-center">Loading...</h1>;
  }

  const localUser = JSON.parse(localStorage.getItem('user'));
  const userRole = localUser && localUser.user && localUser.user.role;
  return (
    <Row className="service-details">
      <Col md={8}>
        <img
          src={service.image}
          alt="service"
          className="service-image"
          style={{
            width: '80%', height: '70vh', borderRadius: '5%', border: '3px solid #97c010',
          }}
        />
      </Col>
      <Col md={4}>
        <div className="right-side-details">
          <h2 className="bigger-stronger-heading">{service.name}</h2>
          <em className="smaller-min-cost">
            {' '}
            - $
            {service.min_cost}
            {' '}
            Minimum Deposit Upon Reservation of Offered Service
          </em>
          <p className="service-description">{service.description}</p>
          <Link to="/api/v1/services" className="discover-link">Discover More Services</Link>
          <br />
          {(userRole === 'user' || userRole === 'admin') && (
          <Button
            type="button"
            variant="primary"
            onClick={handleReserveClick}
            className="bigger-reserve-button"
          >
            <GoGear className="reserve-icon" />
            {' '}
            Reserve
            <FaRegArrowAltCircleRight className="arrow-icon" />
          </Button>
          )}
        </div>
      </Col>
    </Row>
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
