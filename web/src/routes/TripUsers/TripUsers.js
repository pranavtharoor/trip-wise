import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TripUsersList from 'Src/modules/TripUsersList';
import './tripUsers.scss';
import { withRouter, Link } from 'react-router-dom';

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
        <div className="header">
          <div
            style={{
              borderBottom: 'solid thin rgba(100, 100, 100, 0.1)',
              paddingBottom: 10
            }}
          >
            TRIP MEMBERS
          </div>
          <div className="nav">
            <div>
              <Link to={`/trips/${this.props.match.params.tripId}/booking`}>
                Booking
              </Link>
            </div>
            <div>
              <Link to={`/trips/${this.props.match.params.tripId}/chat`}>
                Chat
              </Link>
            </div>
            <div>
              <Link to={`/trips/${this.props.match.params.tripId}/expenses`}>
                Expenses
              </Link>
            </div>
            <div>
              <a href={`http://localhost:3000/api/trips/3/music`}>
                Music
              </a>
            </div>
          </div>
        </div>
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
            placeholder="Search"
            onChange={e => this.setState({ user: e.target.value })}
          />
          <button>Go</button>
          {this.state.newUsers.map((user, i) => (
            <div className="list" key={`asd${i}`}>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div className="btn">
                <button
                  disabled={this.state.toAdd.includes(user.id)}
                  onClick={() => this.addUser(user.id)}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </form>
        {this.state.newUsers.length > 0 && (
          <button
            disabled={this.state.toAdd.length === 0}
            onClick={() => this.addList()}
          >
            Continue
          </button>
        )}
      </div>
    );
  }
}

TripUsers.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(TripUsers);
