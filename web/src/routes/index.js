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
    component: class Expenses extends React.Component {}
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
