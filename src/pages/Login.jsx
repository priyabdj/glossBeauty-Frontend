import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const payload = currentState === 'Login'
      ? { email, password }
      : { name, email, password };

    const endpoint = currentState === 'Login'
      ? "/auth/login"
      : "/auth/register";

    try {
      const res = await axiosInstance.post(endpoint, payload);
      
      if (res.status === 200 || res.status === 201) {
        if (res.data.message === 'Login successful' || res.data.message === 'Registered successfully') {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          
          const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
          if (redirectAfterLogin) {
            localStorage.removeItem('redirectAfterLogin');
            navigate(redirectAfterLogin);
          } else {
            navigate('/');
          }
          return;
        }
        
        try {
          const profileRes = await axiosInstance.get('/auth/profile');
          if (profileRes.data.success) {
            navigate('/');
          } else {
            alert('Authentication failed. Please try again.');
          }
        } catch (profileErr) {
          alert('Authentication verification failed. Please try again.');
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/');
      return;
    }

    axiosInstance.get("/auth/profile")
      .then((res) => {
        if (res.data.success) navigate('/');
      })
      .catch(() => {});
  }, [navigate]);

  useEffect(() => {
    if (location.state?.fromLogout) {
      setCurrentState('Login');
    }
  }, [location.state]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-[400px] m-auto mt-20 gap-4 text-gray-800 bg-white border border-gray-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">{currentState}</h2>

      {currentState === 'Sign Up' && (
        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-400 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-400 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="w-full text-right text-sm">
        {currentState === 'Login' ? (
          <span onClick={() => setCurrentState('Sign Up')} className="text-blue-600 cursor-pointer hover:underline">
            Create an account
          </span>
        ) : (
          <span onClick={() => setCurrentState('Login')} className="text-blue-600 cursor-pointer hover:underline">
            Already have an account?
          </span>
        )}
      </div>

      <button type="submit" className="w-full bg-black text-white py-2 rounded hover:opacity-90">
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;