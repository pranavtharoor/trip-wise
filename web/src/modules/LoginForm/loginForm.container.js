import { connect } from 'react-redux';
import { action } from 'Src/utils';
import LoginForm from './LoginForm';
import { AUTH } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(action(AUTH.REQUEST, data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
