import { LOGIN_SET_NAME } from './action';

function login(state = {}, action = {}) {
	switch (action.type) {
		default:
			return state;
	}
}

login.goFarther = () => dispatch => {
	dispatch({
		type: LOGIN_SET_NAME,
	});
};

export default login;
