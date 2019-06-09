import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TripUsersList from 'Src/modules/TripUsersList';
import './tripUsers.scss';
import { withRouter } from 'react-router-dom';

class TripUsers extends Component {
  state = {
    user: '',
    newUsers: [],
    toAdd: []
  };

  searchUser = () => {
    fetch(`/api/auth/search/${this.state.user}`, { credentials: 'include' })
      .then(data => data.json())
      .then(data => this.setState({ newUsers: data.data }));
  };

  addUser = id => {
    this.setState({ toAdd: [...this.state.toAdd, id] });
  };

  addList = () => {
    fetch('/api/trips/addmembers', {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'POST',
      body: JSON.stringify({
        tripid: this.props.match.params.tripId,
        users: this.state.toAdd
      })
    })
      .then(data => data.json())
      .then(data => {
        if (data.success)
          this.props.history.push(
            `/trips/${this.props.match.params.tripId}/chat`
          );
      });
  };
  render() {
    return (
      <div className="trip-users-page">
        <div className="header">TRIP MEMBERS</div>
        <TripUsersList tripId={this.props.match.params.tripId} />
        <form
          onSubmit={e => {
            e.preventDefault();
            this.searchUser();
          }}
        >
          <input
            value={this.state.user}
            type="text"
            name="user"
            onChange={e => this.setState({ user: e.target.value })}
          />
          {this.state.newUsers.map((user, i) => (
            <div key={`asd${i}`}>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <button
                disabled={this.state.toAdd.includes(user.id)}
                onClick={() => this.addUser(user.id)}
              >
                Add
              </button>
            </div>
          ))}
        </form>
        <button
          disabled={this.state.toAdd.length === 0}
          onClick={() => this.addList()}
        >
          Continue
        </button>
      </div>
    );
  }
}

TripUsers.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(TripUsers);
