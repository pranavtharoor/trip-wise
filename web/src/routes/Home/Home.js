import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

const Home = () => (
  <div className="home-page">
    <div className="heading">TripWise</div>
    <div>
      <Link to="/signin">Sign In</Link>
    </div>
    <div>
      <Link to="/signup">Sign Up</Link>
    </div>
  </div>
);

export default Home;
