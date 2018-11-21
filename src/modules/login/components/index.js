<<<<<<< HEAD
import React, {Component} from 'react';
import {Text, Vibration, ToastAndroid} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {Container, Header, Content, Form, Item, Input, Button, Icon} from 'native-base';

import {EROR_MESSAGE} from '../constants';

/** Првоерка валидности полей на пустоту */
const validate = values => {
	const errors = {};
	Object.keys(values).foreach(key => {
		if (values[key].trim().length === 0) {
			errors[key] = 'Обязательное поле';

			// Vibration.vibrate(500);
			ToastAndroid.showWithGravityAndOffset(
				EROR_MESSAGE.UNVALIDATE_FORM,
				ToastAndroid.LONG,
				ToastAndroid.BOTTOM,
				0,
				50,
			);
		}
	});

	return errors;
};

/**
 * Обычное текстовое поле для ввода
 */
const wrapTextInput = ({input: {onChange, ...restInput}, componentProps, ...restProps}) => (
	<Input onChangeText={onChange} {...restInput} {...componentProps} {...restProps} />
);

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isErrorValidation: {},
		};
	}

	/** Отправка action на авторизацию по логину и паролю */
	onClickSendForm({handleSubmit}) {
		const isErrorValidation = handleSubmit(validate)();
		if (Object.keys(isErrorValidation).length === 0) {
			console.log('good');
		} else {
			this.setState({
				isErrorValidation,
			});
		}
	}
=======
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
>>>>>>> a353c4cb8da99cf0f83667a0af83d07035beb438

	render() {
<<<<<<< HEAD
		console.log('Login props', this.props);
		const {
			onClickSendForm,
			state: {isErrorValidation},
			props,
			props: {error},
		} = this;

		return (
			<Container>
				<Header />
				<Content>
					<Form>
						<Item error={Boolean(isErrorValidation.login)}>
							<Field
								name='login'
								component={wrapTextInput}
								placeholder='Username'
								textContentType='username'
							/>
							{Boolean(isErrorValidation.login) && <Icon name='close-circle' />}
						</Item>
						<Item error={Boolean(isErrorValidation.password)}>
							<Field
								name='password'
								component={wrapTextInput}
								placeholder='Password'
								textContentType='password'
								secureTextEntry
							/>
							{Boolean(isErrorValidation.password) && <Icon name='close-circle' />}
						</Item>
						<Button full light onPress={() => onClickSendForm(props)}>
							<Text> Login </Text>
						</Button>
					</Form>
					{error && <Text> {error.message} </Text>}
				</Content>
			</Container>
=======
		const {onAutarization} = this.props;
		return (
			<View style={styles.container}>
				<Text onPress={() => onAutarization({email: 'demo@initflow.com', password: 'demo'})}>
					LoginScreen - Нажми меня ^-^ !
				</Text>
			</View>
>>>>>>> a353c4cb8da99cf0f83667a0af83d07035beb438
		);
	}
}

export default reduxForm({
	initialValues: {
		login: '',
		password: '',
	},
	form: 'LoginForm',
})(Login);
