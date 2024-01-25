import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { faTwitter, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchServices } from '../redux/servicesSlice';

const ServiceList = () => {
  const dispatch = useDispatch();
  const { data: services, status, error } = useSelector((state) => state.services);
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Assuming user information is stored in the auth state
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  // Specify the number of services per item
  const servicesPerItem = 3;

  // Group services into arrays based on the specified number of services per item
  const groupedServices = [];
  for (let i = 0; i < services.length; i += servicesPerItem) {
    groupedServices.push(services.slice(i, i + servicesPerItem));
  }

  return (
    <>
      {isAuthenticated && (
        <div>
          {/* Display user information */}
          Welcome, {user.email}! {/* Replace 'username' with the actual property you have for the username */}
          {console.log(user)}
        </div>
      )}

      <Carousel activeIndex={index} onSelect={handleSelect} className="carousel-body">
        {groupedServices.map((group) => (
          <Carousel.Item key={uuidv4()} className="carousel-bg">
            <Carousel.Caption>
              <Row xs={1} md={2} lg={3} xl={4} className="d-flex justify-content-between card-body">
                {group.map((service) => (
                  <Col key={uuidv4()}>
                    {/* Wrap each card with Link component */}
                    <Link to={`/services/${service.id}`} className="card-link">
                      <Card className="card-sizing">
                        <Card.Img variant="top" src={service.image} alt={service.name} />
                        <Card.Body>
                          <Card.Title>{service.name}</Card.Title>
                          <Card.Text>{service.description}</Card.Text>
                          <Container className="mt-4 py-3 sc-container d-flex flex-column">
                            <div className="text-center">
                              <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                aria-label="Visit Twitter profile"
                              >
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                              </a>
                              <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                aria-label="Visit Facebook profile"
                              >
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                              </a>
                              <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                aria-label="Visit GitHub profile"
                              >
                                <FontAwesomeIcon icon={faGithub} size="2x" />
                              </a>
                            </div>
                          </Container>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ServiceList;
