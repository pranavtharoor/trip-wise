import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './tripForm.scss';

const tripValidate = values => {
  const errors = {};

  if (!values.name) errors.name = 'Required';
  else if (values.name.length > 250)
    errors.name = 'Must be less than 250 characters long';

  return errors;
};

let TripField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched && (error && <span className="error">{error}</span>)}
  </div>
);

TripField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

let TripForm = props => (
  <div className="trip-form">
    <div className="form">
      <form
        onSubmit={props.handleSubmit(data =>
          props.onTripSubmit({ data, push: props.history.push })
        )}
      >
        <Field name="name" component={TripField} type="text" label="Name" />
        <button>Continue</button>
      </form>
    </div>
  </div>
);

TripForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onTripSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

TripForm = reduxForm({
  form: 'trip',
  validate: tripValidate
})(TripForm);

export default withRouter(TripForm);
