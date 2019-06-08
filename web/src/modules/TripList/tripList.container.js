import { connect } from 'react-redux';
import { pick } from 'ramda';
import TripList from './TripList';
import { action } from 'Src/utils';
import { TRIP } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  fetchTrips: () => dispatch(action(TRIP.FETCH.REQUEST))
});

const mapStateToProps = state => ({
  ...pick(['trips'], state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripList);
