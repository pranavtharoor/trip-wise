import React from 'react';
import LoginForm from 'Src/modules/LoginForm';
import './login.scss';

const Login = () => (
  <div className="login-page">
    <div className="form-container">
      <LoginForm />
    </div>
  </div>
);

export default Login;
