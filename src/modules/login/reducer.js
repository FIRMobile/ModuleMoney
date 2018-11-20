import { LOGIN_SET_NAME } from './action';

function login(
	state = {
		isLoading: false,
		error: undefined,
		token: undefined,
	},
	action = {},
) {
	switch (action.type) {
		default:
			return state;
	}
}

login.authorization = () => dispatch => {
	dispatch({
		type: LOGIN_SET_NAME,
	});
};

export default login;
