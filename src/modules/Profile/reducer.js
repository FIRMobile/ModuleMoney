import { PROFILE_SET_NAME, PROFILE_BACK } from './action';

function profile(
	state = {
		name: 'Maksim',
	},
	action = {},
) {
	switch (action.type) {
		case PROFILE_SET_NAME: {
			return {
				...state,
				name: action.name,
			};
		}
		default:
			return state;
	}
}

profile.updateName = () => (dispatch, getState) => {
	dispatch({
		type: PROFILE_SET_NAME,
		name: getState().profile.name === 'Pavel' ? 'Maksim' : 'Pavel',
	});
};
profile.back = () => dispatch => {
	dispatch({
		type: PROFILE_BACK,
	});
};

export default profile;
