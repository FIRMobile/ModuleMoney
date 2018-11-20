import {
	reduxifyNavigator,
	createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import Root from '../../routes';

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const App = reduxifyNavigator(Root, 'root');
const mapStateToProps = state => ({
	state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

export { middleware };
export default AppWithNavigationState;
