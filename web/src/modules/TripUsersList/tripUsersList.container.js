import { connect } from 'react-redux';
import { pick } from 'ramda';
import TripUsersList from './TripUsersList';
import { action } from 'Src/utils';
import { TRIP_USERS } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  fetchTripUsers: data => dispatch(action(TRIP_USERS.FETCH.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['tripUsers'], state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripUsersList);
