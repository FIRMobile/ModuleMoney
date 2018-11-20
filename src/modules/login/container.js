import { connect } from 'react-redux';
import LoginScreen from './components';
import loginReducer from './reducer';

const Login = connect(
	null,
	dispatch => ({
		onUpdateName: () => {
			dispatch(loginReducer.goFarther());
		},
	}),
)(LoginScreen);

export default Login;
