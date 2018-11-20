import { connect } from 'react-redux';
import ProfileScreen from './components';
import profileReducer from './reducer';

const Profile = connect(
	state => ({
		name: state.profile.name,
	}),
	dispatch => ({
		onUpdateName: () => {
			dispatch(profileReducer.updateName());
		},
		onBack: () => {
			dispatch(profileReducer.back());
		},
	}),
)(ProfileScreen);

export default Profile;
