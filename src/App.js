import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicExample from './components/nav';
import BasicExample2 from './components/services';
import Home from './components/Home';


const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});
  
  
  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
    setUser(data.user);
  };
  
  return (
    <Router>
      <>
        <BasicExample />

        <Routes>
          <Route path="/services" element={<BasicExample2 />} />
          <Route path="/reserve-form" element={<div>Link Content</div>} />
          <Route path="/my-reservations" element={<div>Action 3.1 Content</div>} />
          <Route path="/add-reservation" element={<div>Link Content</div>} />
          <Route path="/dashboard" element={<BasicExample2 />} />
          <Route
            exact
            path="/"
            element={<Home handleLogin={handleLogin} loggedInStatus={loggedInStatus} />}
          />          
        </Routes>
      </>
    </Router>
  );
}

export default App;
