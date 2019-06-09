import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tripList.scss';
import { Link } from 'react-router-dom';

class TripList extends Component {
  componentDidMount() {
    this.props.fetchTrips();
  }
  render() {
    const { trips } = this.props;
    return (
      <div className="trip-list">
        {trips.map((trip, i) => (
          <Link to={`/trips/${trip.tripid}`} key={`trip_${i}`}>
            <div>{trip.name}</div>
          </Link>
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
