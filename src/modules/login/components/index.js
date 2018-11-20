import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
});

export default class LoginScreen extends React.PureComponent {
	render() {
		const {onAutarization} = this.props;
		return (
			<View style={styles.container}>
				<Text onPress={() => onAutarization({email: 'demo@initflow.com', password: 'demo'})}>
					LoginScreen - Нажми меня ^-^ !
				</Text>
			</View>
		);
	}
}
