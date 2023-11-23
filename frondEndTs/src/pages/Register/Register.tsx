import React, { useState } from 'react';
import { registerUser } from '../../redux/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks/Hooks';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission logic here
    console.log(formData);
    e.preventDefault();
    try {
      const { payload } = (await dispatch(registerUser(formData))) as {
        payload: any;
      };
      if (payload.token) {
        navigate('/');
      }
      console.log('User created successfully', payload);
    } catch (error) {
      console.error('User creation error', error);
    }
  };
  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="sign-btn">
          Sign Up
        </button>
        <div className="login-link">
          <p>Already have an account?</p>
          <a href="/login">Log in</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
