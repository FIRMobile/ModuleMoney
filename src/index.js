import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoot from './core/navigation';
import configureStore from './store';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#bfd8ff',
	},
});

const LaunchScreen = () => (
	<View style={styles.container}>
		<Text>Launch</Text>
	</View>
);

const { store, persistor } = configureStore();

export default () => (
	<Provider store={store}>
		<PersistGate loading={<LaunchScreen />} persistor={persistor}>
			<AppRoot />
		</PersistGate>
	</Provider>
);
