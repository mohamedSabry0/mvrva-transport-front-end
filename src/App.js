import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import BasicExample from './components/nav';
import ServiceList from './components/services';
import FormExample from './components/reservation-form';
import ServiceDetails from './components/serviceDetails';
import Register from './components/Register';



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <>
          <BasicExample />
          
          <Routes>
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/api/v1/services" element={<ServiceList />} />
            <Route path="/reserve-form" element={<FormExample />} />
            <Route path="/my-reservations" element={<div>Action 3.1 Content</div>} />
            <Route path="/add-reservation" element={<div>Link Content</div>} />
            <Route path="/" element={<ServiceList />} /> 
            <Route path="/register" element={<Register/>} />               
        </Routes>
        </>
      </Router>
    </Provider>
  );
}

export default App;
