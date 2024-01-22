import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './auth/Login';

const Logiclogin = (props) => {
  const navigate = useNavigate(); 

  const [state, setState] = useState({
    loggedInStatus: props.loggedInStatus,
  });

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>
      <h1>Status: {state.loggedInStatus}</h1>
      <Login handleSuccessfulAuth={handleSuccessfulAuth}/>
    </div>
  );
};

export default Logiclogin;
