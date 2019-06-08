import React, { Component } from 'react';
import TripList from 'Src/modules/TripList';
import TripForm from 'Src/modules/TripForm';
import './trips.scss';
import PropTypes from 'prop-types';
import AddButton from 'Src/modules/AddButton';

class Trips extends Component {
  state = {
    formShown: false
  };

  render() {
    return (
      <div className="trips-page">
        <div className="header">TRIPS</div>
        <div className="list-container">
          <TripList />
        </div>
        <div
          className={`form-container ${
            this.state.formShown ? 'shown' : 'hidden'
          }`}
        >
          <TripForm />
        </div>
        <div
          className={`add-button-container ${
            this.state.formShown ? 'shown' : 'hidden'
          }`}
          onClick={() => this.setState({ formShown: !this.state.formShown })}
        >
          <AddButton />
        </div>
      </div>
    );
  }
}

Trips.propTypes = {
  match: PropTypes.object.isRequired
};

export default Trips;
