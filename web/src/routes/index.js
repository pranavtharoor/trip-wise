import Home from './Home';
import Register from './Register';
import Login from './Login';

export default [
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
