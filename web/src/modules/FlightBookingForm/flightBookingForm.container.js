import { connect } from 'react-redux';
import { action } from 'Src/utils';
import { pick } from 'ramda';
import FlightBookingForm from './FlightBookingForm';
import { FLIGHT_BOOKING, FLIGHT_CHOICE } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onFlightBooking: data => dispatch(action(FLIGHT_BOOKING.REQUEST, data)),
  onFlightChoice: data => dispatch(action(FLIGHT_CHOICE.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['available'], state.flights)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightBookingForm);
