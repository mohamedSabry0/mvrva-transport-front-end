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
          <label htmlFor="name">
            Name:
            <br />
            <input type="text" name="name" id="name" value={name} onChange={onChange} />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <br />
            <input type="email" name="email" id="email" value={email} onChange={onChange} />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <br />
            <input type="password" name="password" id="password" value={password} onChange={onChange} />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
