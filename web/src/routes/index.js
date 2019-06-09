import Home from './Home';
import Register from './Register';
import Login from './Login';
import Trips from './Trips';
import Booking from './Booking';
import TripUsers from './TripUsers';
import React from 'react';
import './expenses.scss';

export default [
  {
    name: 'Chat',
    pathname: '/trips/:tripId/chat',
    component: class Chat extends React.Component {
      render() {
        return (
          <div style={{ fontSize: '3rem', fontWeight: 500, padding: 40 }}>
            Chat
          </div>
        );
      }
    }
  },
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
        amount: null,
        total: null,
        desc: ''
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
            this.setState({
              teammates: data.data,
              teammate: data.data[0].id,
              nameTeammate: data.data[0].name
            })
          );
      };
      componentDidMount() {
        this.fetchData();
      }
      submitExchanges = () => {
        const owsList = this.state.exchanges.filter(a => a.type === 'owes');
        const paidList = this.state.exchanges.filter(a => a.type === 'paid');
        const owes = owsList.map(a => ({ user: a.teammate, amount: a.amount }));
        const paid = paidList.map(a => ({
          user: a.teammate,
          amount: a.amount
        }));
        const body = {
          tripid: this.props.match.params.tripId,
          desc: this.state.desc,
          amount: this.state.total,
          owes,
          paid
        };
        fetch('/api/expenses/addExpense', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
          },
          method: 'POST',
          body: JSON.stringify(body),
          credentials: 'include'
        })
          .then(data => data.json())
          .then(data => console.log(data));
      };
      render() {
        return (
          <div className="expenses">
            <div className="header">EXPENSES</div>
            {this.state.expenses.map(expense => (
              <div className="block-item">
                <div className="name">{expense.name}</div>
                <div className="desc">{expense.description}</div>
                <div className="amt">Rs. {expense.amount}</div>
              </div>
            ))}
            {!this.state.showList && (
              <button onClick={() => this.setState({ showList: true })}>
                Add Expense / Payment
              </button>
            )}
            {this.state.showList && (
              <div className="form-items">
                {this.state.exchanges.map(exchange => (
                  <div className="added-users">
                    {/* {JSON.stringify(exchange)} */}
                    <div className="user"> {exchange.name}</div>
                    {/* <div>Email: {exchange.email}</div> */}
                    <div>Rs. {exchange.amount}</div>
                    <div className="paid"> {exchange.type}</div>
                  </div>
                ))}
                <textarea
                  placeholder="Description"
                  value={this.state.desc}
                  onChange={e => this.setState({ desc: e.target.value })}
                />
                <input
                  onChange={e => this.setState({ total: e.target.value })}
                  type="number"
                  name="total"
                  placeholder="Total"
                  value={this.state.total}
                />
                <br />
                <hr />
                <select
                  name="teammate"
                  onChange={e =>
                    this.setState({
                      teammate: e.target.selectedOptions[0].value,
                      nameTeammate: e.target.selectedOptions[0].label
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
                      type: e.target.selectedOptions[0].value
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
                  placeholder="Amount"
                  value={this.state.amount}
                />
                <button
                  onClick={() =>
                    this.setState({
                      exchanges: [
                        ...this.state.exchanges,
                        {
                          name: this.state.nameTeammate,
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
                <br />
                <button onClick={() => this.submitExchanges()}>Confirm</button>
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
