import requestsManager from '../../core/rest/fetch-client';
import {LOGIN_SET_NAME, LOGIN_SUCCESS_AUTHORIZATION, LOGIN_ERROR_AUTHORIZATION} from './action';

const requestManager = requestsManager.instance();

function login(
	state = {
		isLoading: false,
		error: undefined,
		token: undefined,
	},
	action = {},
) {
	switch (action.type) {
		case LOGIN_SUCCESS_AUTHORIZATION: {
			return {
				...state,
				token: action.token,
				error: undefined,
				isLoading: true,
			};
		}
		case LOGIN_ERROR_AUTHORIZATION: {
			return {...state, error: action.error};
		}
		default:
			return state;
	}
}

login.authorization = params => dispatch => {
	requestManager.addRequest(10, requestManager.login, 'login', params, response => {
		const {error, token} = response;
		if (token)
			dispatch({
				type: LOGIN_SUCCESS_AUTHORIZATION,
				token,
			});
		if (error)
			dispatch({
				type: LOGIN_ERROR_AUTHORIZATION,
				error,
			});

		dispatch({
			type: LOGIN_SET_NAME,
		});
	});
};

export default login;
