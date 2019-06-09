import Home from './Home';
import Register from './Register';
import Login from './Login';
import Trips from './Trips';
import Booking from './Booking';
import TripUsers from './TripUsers';
import React from 'react';

export default [
  {
    name: 'Expenses',
    pathname: '/trips/:tripId/expenses',
    component: class Expenses extends React.Component {
      state = {
        expenses: [],
        teammates: [],
        showList: false,
        exchanges: [],
        type: 'paid',
        teammate: {},
        amount: null
      };
      fetchData = () => {
        fetch('/api/expenses/listExpenses', { credentials: 'include' })
          .then(data => data.json())
          .then(data => this.setState({ expenses: data.data }));
        fetch(`/api/trips/${this.props.match.params.tripId}`, {
          credentials: 'include'
        })
          .then(data => data.json())
          .then(data =>
            this.setState({ teammates: data.data, teammate: data.data[0] })
          );
      };
      componentDidMount() {
        this.fetchData();
      }
      render() {
        return (
          <div>
            {this.state.expenses.map(expense => (
              <div>{JSON.stringify(expense)}</div>
            ))}
            {!this.state.showList && (
              <button onClick={() => this.setState({ showList: true })}>
                Add Expense / Payment
              </button>
            )}
            {this.state.showList && (
              <div>
                {this.state.exchanges.map(exchange => (
                  <div>{JSON.stringify(exchange)}</div>
                ))}
                <select
                  name="teammate"
                  onChange={e =>
                    this.setState({
                      teammate: this.state.teammates[
                        e.target.selectedOptions[0]
                      ]
                    })
                  }
                >
                  {this.state.teammates.map(teammate => (
                    <option value={teammate.userid}>{teammate.name}</option>
                  ))}
                </select>
                <select
                  name="type"
                  onChange={e =>
                    this.setState({
                      type: e.target.selectedOptions[0] === 0 ? 'paid' : 'owes'
                    })
                  }
                >
                  <option value="paid">Paid</option>
                  <option value="owes">Owes</option>
                </select>
                <input
                  onChange={e => this.setState({ amount: e.target.value })}
                  type="number"
                  name="amount"
                  placeholder="amount"
                  value={this.state.amount}
                />
                <button
                  onClick={() =>
                    this.setState({
                      exchanges: [
                        ...this.state.exchanges,
                        {
                          teammate: this.state.teammate,
                          type: this.state.type,
                          amount: this.state.amount
                        }
                      ]
                    })
                  }
                >
                  Add
                </button>
              </div>
            )}
          </div>
        );
      }
    }
  },
  {
    name: 'TripUsers',
    pathname: '/trips/:tripId',
    component: TripUsers
  },
  {
    name: 'Booking',
    pathname: '/trips/:tripId/booking',
    component: Booking
  },
  {
    name: 'Trips',
    pathname: '/trips',
    component: Trips
  },
  {
    name: 'Login',
    pathname: '/signin',
    component: Login
  },
  {
    name: 'Register',
    pathname: '/signup',
    component: Register
  },
  {
    name: 'Home',
    pathname: '*',
    component: Home
  }
];
