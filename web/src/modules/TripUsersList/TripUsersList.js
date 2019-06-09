import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tripUsersList.scss';

class TripUsersList extends Component {
  componentDidMount() {
    this.props.fetchTripUsers(this.props.tripId);
  }
  render() {
    const { tripUsers } = this.props;
    return (
      <div className="trip-users-list">
        {tripUsers.map((tripUser, i) => (
          <div key={`trip_user_${i}`}>{tripUser.name}</div>
        ))}
      </div>
    );
  }
}
TripUsersList.propTypes = {
  tripUsers: PropTypes.array.isRequired,
  fetchTripUsers: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired
};

export default TripUsersList;
