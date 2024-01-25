import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser, setAuthToken } from '../redux/authSlice';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, token, isAuthenticated } = useSelector((state) => state.auth);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    // Check if user is already authenticated and active
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch loginUser action
      const token = await dispatch(loginUser({ email, password }));
      // Dispatch setAuthToken to store the token in the state
      dispatch(setAuthToken(token));
      // Redirect to the home page or perform any other necessary actions
      console.log('Login successful! Redirecting...');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      // Handle errors
    }
  };

  useEffect(() => {
    // Set the authorization token in the axios headers after successful login
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  // Check if the user is already authenticated and active
  if (isAuthenticated) {
    return <div>You are already logged in. Redirecting...</div>;
  }

  return (
    <>
      <section>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={password}
            required
          />
          <button disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <a href="/register">Sign Up</a>
          </span>
        </p>
      </section>
    </>
  );
};

export default Login;
