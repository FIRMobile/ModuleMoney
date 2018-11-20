import { NavigationActions } from 'react-navigation';
import { LOGIN_SET_NAME, PROFILE_BACK } from '../../modules';
import Root from '../../routes';

const navigation = (state, nameScreen) => {
	let nextState;
	if (!state.routes.some(el => el.routeName === nameScreen)) {
		nextState = Root.router.getStateForAction(
			NavigationActions.navigate({ routeName: nameScreen }),
			state,
		);
	}
	return nextState;
};

const secondAction = Root.router.getActionForPathAndParams('Login');
const initialNavState = Root.router.getStateForAction(secondAction);

export default function nav(state = initialNavState, action) {
	let nextState;
	switch (action.type) {
		case PROFILE_BACK:
			nextState = Root.router.getStateForAction(NavigationActions.back(), state);
			break;
		case LOGIN_SET_NAME:
			nextState = navigation(state, 'Profile');
			break;
		default:
			nextState = Root.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}
