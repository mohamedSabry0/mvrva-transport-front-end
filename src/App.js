import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import BasicExample from './components/nav';
import BasicExample2 from './components/services';
import Logiclogin from './components/Logiclogin';
import Logicregistration from './components/Logicregistration';


const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});
  
  
  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
    setUser(data.user);
  };
  
  return (
    <Provider store={store}>
      <Router>
        <>
          <BasicExample />

          <Routes>
            <Route path="/api/v1/services" element={<BasicExample2 />} />
            <Route path="/reserve-form" element={<div>Link Content</div>} />
            <Route path="/my-reservations" element={<div>Action 3.1 Content</div>} />
            <Route path="/add-reservation" element={<div>Link Content</div>} />
            <Route path="/dashboard" element={<BasicExample2 />} />
            <Route
            exact
            path="/"
            element={<Logiclogin handleLogin={handleLogin} loggedInStatus={loggedInStatus} />}
            />
            <Route
            exact
            path="/"
            element={<Logicregistration handleLogin={handleLogin} loggedInStatus={loggedInStatus} />}
            />           
        </Routes>
        </>
      </Router>
    </Provider>
  );
}

export default App;
