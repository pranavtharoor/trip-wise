import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './flightBookingForm.scss';

const flightBookingValidate = values => {
  const errors = {};
  if (!values.email) errors.email = 'Required';
  // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
  //   errors.email = 'Invalid email address';

  // if (!values.name) errors.name = 'Required';
  // else if (values.name.length > 50)
  //   errors.name = 'Must be less than 50 characters long';

  // if (!values.password) errors.password = 'Required';
  // else if (values.password.length > 30 || values.password.length < 8)
  //   errors.password = 'Must be 8 - 30 characters long';

  return errors;
};

let FlightBookingField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    <span className="error">{touched && (error && error)}</span>
  </div>
);

FlightBookingField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

class FlightBookingFormClass extends Component {
  render() {
    const props = this.props;
    const { available } = props;
    return (
      <div className="flight-booking-form">
        <div className="form">
          <form
            onSubmit={props.handleSubmit(data =>
              props.onFlightBooking({
                data: { ...data, tripid: props.tripId },
                push: props.history.push
              })
            )}
          >
            <Field name="dateofdeparture" component="input" type="date" />
            Date of Departure
            <Field
              name="seatingclass"
              component="input"
              type="radio"
              value="E"
              checked
            />
            Economic
            <Field
              name="seatingclass"
              component="input"
              type="radio"
              value="B"
            />
            Business
            <button>Continue</button>
          </form>
          <div>
            {available.map((flight, i) => (
              <div
                key={`flight_${i}`}
                onClick={() =>
                  props.onFlightChoice({
                    data: {
                      carrierid: flight.carrierid,
                      airline: flight.airline,
                      flightno: flight.flightno,
                      totalfare: flight.fare.totalfare
                    },
                    push: props.history.push
                  })
                }
              >
                <div>AIRLINE:{flight.airline}</div>
                <div>FLIGHT NO:{flight.flightno}</div>
                <div>TOTAL FARE:{flight.fare.totalfare}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

FlightBookingFormClass.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onFlightBooking: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  tripId: PropTypes.string.isRequired,
  available: PropTypes.array.isRequired,
  onFlightChoice: PropTypes.func.isRequired
};

const FlightBookingForm = reduxForm({
  form: 'flightBooking',
  validate: flightBookingValidate
})(FlightBookingFormClass);

export default withRouter(FlightBookingForm);
