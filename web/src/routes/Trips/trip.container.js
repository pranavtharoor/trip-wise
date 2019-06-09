import { connect } from 'react-redux';
import { action } from 'Src/utils';
import Trips from './Trips';
import { TRIP_FORM } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  toggleTripForm: () => dispatch(action(TRIP_FORM.TOGGLE))
});

const mapStateToProps = state => ({
  ...pick(['formShown'], state.trip)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips);
