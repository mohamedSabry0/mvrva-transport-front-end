import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Accordion } from 'react-bootstrap';
import { fetchServices, deleteService } from '../../redux/service/servicesSlice';

const ServiceDeletion = () => {
  const dispatch = useDispatch();
  const {
    data, isSuccess, message,
  } = useSelector((state) => state.services);
  const status = useSelector((state) => state.services.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchServices());
    }
  }, [status, dispatch]);

  const handleDelete = (serviceId) => {
    dispatch(deleteService(serviceId));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    } else if (message) {
      toast.error(message);
    }
  }, [isSuccess, message]);

  return (
    <div className="card-submit">
      <div>
        <h2 style={{ marginBottom: '5%' }}>Services List</h2>
        <Accordion defaultActiveKey="0">
          {data.map((service) => (
            <Accordion.Item
              key={service.id}
              eventKey={service.id.toString()}
            >
              <Accordion.Header>{service.name}</Accordion.Header>
              <Accordion.Body>
                <em>
                  Created at
                  {' '}
                  {service.created_at}
                  {' '}
                  and costs $
                  {service.min_cost}
                </em>
                <br />
                <br />
                <p>{service.description}</p>
                <button
                  type="button"
                  onClick={() => handleDelete(service.id)}
                  style={{
                    backgroundColor: 'var(--primary-color)', color: '#fff', border: 'none', paddingBlock: '0.7%', paddingInline: '0.7%', borderRadius: '10%',
                  }}
                >
                  Delete
                </button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ServiceDeletion;
