import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './signup.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    
    <div className='page'>
      <a className='home-link' href='/'>Home</a>
      <img className='cabin' src='https://wallpaperaccess.com/full/2694375.jpg' alt=''/>
      <div className='center'>
        <h1>Sign up</h1>
        <form onSubmit={onLogin}>   
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
         <div className='content'>
          
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
          <div  className='content'>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          </div>
          <div className='submit_btn'>
            <button className='submit_signup' type='submit'>Log in</button>
            </div>
        </form>
        </div>
    </div>

  );
};

export default LoginForm;
