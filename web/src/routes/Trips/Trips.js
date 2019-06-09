import React from 'react';
import TripList from 'Src/modules/TripList';
import TripForm from 'Src/modules/TripForm';
import './trips.scss';
import PropTypes from 'prop-types';
import AddButton from 'Src/modules/AddButton';
import { Link } from 'react-router-dom';

const Trips = props => (
  <div className="trips-page">
    <div className="header">
      <div>TRIPS</div>
    </div>
    <div className="list-container">
      <TripList />
    </div>
    <div className={`form-container ${props.formShown ? 'shown' : 'hidden'}`}>
      <TripForm />
    </div>
    <div
      className={`add-button-container ${props.formShown ? 'shown' : 'hidden'}`}
      onClick={() => props.toggleTripForm()}
    >
      <AddButton />
    </div>
  </div>
);

Trips.propTypes = {
  formShown: PropTypes.bool.isRequired,
  toggleTripForm: PropTypes.func.isRequired
};

export default Trips;
