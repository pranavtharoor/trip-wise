import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

const Home = () => (
  <div className="home-page">
    TripWise
    <Link to="/signin">Sign In</Link>
    <Link to="/signup">Sign Up</Link>
  </div>
);

export default Home;
