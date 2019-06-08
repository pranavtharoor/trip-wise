import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tripList.scss';

class TripList extends Component {
  componentDidMount() {
    this.props.fetchTrips();
  }
  render() {
    const { trips } = this.props;
    return (
      <div className="trip-list">
        {trips.map((trip, i) => (
          <div key={`trip_${i}`}>{trip.name}</div>
        ))}
      </div>
    );
  }
}
TripList.propTypes = {
  trips: PropTypes.array.isRequired,
  fetchTrips: PropTypes.func.isRequired
};

export default TripList;
