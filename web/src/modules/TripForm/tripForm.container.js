import { connect } from 'react-redux';
import { action } from 'Src/utils';
import TripForm from './TripForm';
import { TRIP } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onTripSubmit: data => dispatch(action(TRIP.CREATE.REQUEST, data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm);
