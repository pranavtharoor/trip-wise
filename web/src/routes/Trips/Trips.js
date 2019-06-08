import React from 'react';
import TripList from 'Src/modules/TripList';
import TripForm from 'Src/modules/TripForm';
import './trips.scss';

const Trips = () => (
  <div className="trips-page">
    <div className="list-container">
      <TripList />
      <TripForm />
    </div>
  </div>
);

export default Trips;
