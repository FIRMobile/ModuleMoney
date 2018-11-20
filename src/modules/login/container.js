import { connect } from 'react-redux';
import LoginScreen from './components';
import loginReducer from './reducer';

const Login = connect(
	state => ({
		error: state.login.error,
	}),
	dispatch => ({
		onAutarization: params => {
			dispatch(loginReducer.authorization(params));
		},
	}),
)(LoginScreen);

export default Login;
