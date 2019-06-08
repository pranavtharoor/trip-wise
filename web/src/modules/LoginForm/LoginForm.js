import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './loginForm.scss';

let LoginForm = props => (
  <div className="login-form">
    <div className="form">
      <form
        onSubmit={props.handleSubmit(data =>
          props.onLogin({ data, push: props.history.push })
        )}
      >
        <Field
          name="email"
          component="input"
          type="email"
          placeholder="Email"
        />
        <br />
        <Field
          name="password"
          component="input"
          type="password"
          placeholder="Password"
        />
        <br />
        <button>Login</button>
      </form>
    </div>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default withRouter(LoginForm);
