import { createStackNavigator } from 'react-navigation';
import { loginScreen, profileScreen } from './modules';

const RootNavigator = createStackNavigator(
	{
		Login: { screen: loginScreen },
		Profile: { screen: profileScreen },
	},
	{
		navigationOptions: { header: null },
	},
);

export default RootNavigator;
