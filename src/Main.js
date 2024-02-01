import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';
import Register from './components/auth/register';
import Login from './components/auth/login';
import ServiceList from './components/services/ServiceList';
import MyReservations from './components/MyReservations';
import ReservationForm from './components/ReservationForm';
import ServiceDeletion from './components/admin_items/delete_services';
import ServiceCreationForm from './components/admin_items/add_services';
import SelectedReservation from './components/selectedReservation';
import ServiceDetails from './components/services/serviceDetails';
import './css/custom.css';
import Sidebar from './components/Sidebar';

function Main() {
  return (
    <Provider store={store}>
      <Router>
        <Container fluid className="app">
          <section className="sidebar-container">
            <Sidebar />
          </section>
          <ToastContainer />
          <section className="main-container">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/services" element={<ServiceList />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/service/:id/reservation" element={<SelectedReservation />} />
              <Route path="/reserve-form" element={<ReservationForm />} />
              <Route path="/my-reservations" element={<MyReservations />} />
              <Route path="/add-service" element={<ServiceCreationForm />} />
              <Route path="/delete-service" element={<ServiceDeletion />} />
              <Route path="/*" element={<ServiceList />} />
            </Routes>
          </section>
        </Container>
      </Router>
    </Provider>
  );
}

export default Main;
