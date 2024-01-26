import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../redux/auth/authSlice';
import Authspinner from './authspinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user, isLoading, isSuccess, isError, message,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess || user) {
      toast.success(message);
      navigate('/');
      dispatch(reset());
    }
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      user: {
        name,
        email,
        password,
        role: 'user',
      },
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return <Authspinner />;
  }

  return (
    <div style={{ marginLeft: '300px' }}>
      <h2>Register Form</h2>
      <form onSubmit={onSubmit}>
        <div>
          {/* <label>Name</label> */}
          <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" />
        </div>
        <div>
          {/* <label>Email</label> */}
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" />
        </div>
        <div>
          {/* <label>Password</label> */}
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
