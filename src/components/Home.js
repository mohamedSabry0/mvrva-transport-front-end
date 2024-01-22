import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Registration from './auth/Registration';
import Login from './auth/Login';

const Home = (props) => {
  const navigate = useNavigate(); // New hook in React 18 for navigation

  const [state, setState] = useState({
    loggedInStatus: props.loggedInStatus,
  });

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {state.loggedInStatus}</h1>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth}/>
    </div>
  );
};

export default Home;
