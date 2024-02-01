import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card, Row, Col, Container,
} from 'react-bootstrap';
import { faTwitter, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchServices } from '../../redux/service/servicesSlice';

const ServiceList = () => {
  const dispatch = useDispatch();
  const { data: services, status, error } = useSelector((state) => state.services);
  const [index, setIndex] = useState(0);
  const [servicesPerItem, setServicesPerItem] = useState(3);

  const handleResize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 576) {
      setServicesPerItem(1);
    } else if (screenWidth < 768) {
      setServicesPerItem(1);
    } else if (screenWidth < 992) {
      setServicesPerItem(1);
    } else if (screenWidth < 1200) {
      setServicesPerItem(2);
    } else {
      setServicesPerItem(3);
    }
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();

    dispatch(fetchServices());

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  if (status === 'loading') {
    return <h1 className="text-center">Loading...</h1>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  const truncateDescription = (text, maxLength) => {
    if (text && text.length > 0) {
      const words = text.split(' ');
      if (words.length > maxLength) {
        return `${words.slice(0, maxLength).join(' ')}...`;
      }
      return text;
    }
    return '';
  };

  const groupedServices = [];
  for (let i = 0; i < services.length; i += servicesPerItem) {
    groupedServices.push(services.slice(i, i + servicesPerItem));
  }

  return (
    <>
      <div className="service-component">
        <div className="service-header">
          <h1 className="text-center">OFFERED SERVICES</h1>
          <span className="text-center d-block text-grey">Explore our services from below</span>
        </div>
        <Carousel activeIndex={index} onSelect={handleSelect} className="carousel-body">
          {groupedServices.map((group) => (
            <Carousel.Item key={uuidv4()} className="carousel-bg">
              <Carousel.Caption>

                <Row className="d-flex card-body">
                  {group.map((service) => (
                    <Col key={uuidv4()} xs={12} sm={10} md={10} lg={6} xl={4} xxl={4}>
                      <Card className="card-sizing">
                        <Link to={service ? `/services/${service.id}` : '/services'} className="card-link">
                          <>
                            <div className="card-space p-4">
                              <Card.Img variant="top" src={service?.image} alt={service?.name} style={{ height: '200px' }} />
                              <Card.Body>
                                <Card.Title className="custom-title-style">
                                  <strong>{service?.name}</strong>
                                </Card.Title>
                                <Card.Text className="custom-card-text">
                                  {truncateDescription(service?.description, 30)}
                                  <div>
                                    {' '}
                                    {service?.description?.split(' ').length > 30 && (
                                    <Link to={service ? `/services/${service.id}` : '/services'} className="learn-more-link">
                                      Learn More
                                    </Link>
                                    )}
                                  </div>
                                </Card.Text>
                              </Card.Body>
                            </div>
                          </>
                        </Link>
                        <Container className=" py-3 sc-container d-flex flex-column">
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
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ServiceList;
