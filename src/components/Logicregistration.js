import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Registration from './auth/Registration';


const Logicregistration = (props) => {
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
      <h1>Registration</h1>
      <h1>Status: {state.loggedInStatus}</h1>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  );
};

export default Logicregistration;
