import React from 'react';
import TripList from 'Src/modules/TripList';
import TripForm from 'Src/modules/TripForm';
import { Link } from 'react-router-dom';
import './trips.scss';
import PropTypes from 'prop-types';

const Trips = () => (
  <div className="trips-page">
    <div className="list-container">
      <TripList />
      <TripForm />
      <Link to={`/trips/123/booking`}>asdasd</Link>
    </div>
  </div>
);

Trips.propTypes = {
  match: PropTypes.object.isRequired
};

export default Trips;
