import React from 'react';
import PropTypes from 'prop-types';
import FlightBookingForm from 'Src/modules/FlightBookingForm';
import './booking.scss';

const Booking = ({ match }) => (
  <div className="booking-page">
    <FlightBookingForm tripId={match.params.tripId} />
  </div>
);

Booking.propTypes = {
  match: PropTypes.object.isRequired
};

export default Booking;
