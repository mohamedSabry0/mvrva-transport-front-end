import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import BasicExample from './components/nav';
import ServiceList from './components/services';
import ReservationForm from './components/reservation-form';
import ServiceDetails from './components/serviceDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <BasicExample />

          <div style={{ paddingLeft: '250px' }}>
            <Routes>
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/api/v1/services" element={<ServiceList />} />
              <Route path="/reserve-form" element={<ReservationForm />} />
              <Route path="/my-reservations" element={<div>Action 3.1 Content</div>} />
              <Route path="/add-reservation" element={<div>Link Content</div>} />
              <Route path="/" element={<ServiceList />} />
            </Routes>
          </div>
        </>
      </Router>
    </Provider>
  );
}

export default App;
