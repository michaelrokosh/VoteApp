import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import UserProfilePage from '../components/user_profile_page.jsx';

export const composer = ({ context }, onData) => {
	const { Meteor, APP_ERRORS } = context();
	const user = Meteor.user();
	
	APP_ERRORS.setDefault('ChangePassword', {});
	APP_ERRORS.setDefault('ChangeEmailAndName', {});

	const changeEmailAndNameErrors = APP_ERRORS.get('ChangeEmailAndName'); 
	const changePassErrors = APP_ERRORS.get('ChangePassword');
	
	if(user) {
		console.log(user);
		onData(null, { user, changePassErrors, changeEmailAndNameErrors })
	}
}

export const depsMapper = (context, actions) => ({
	updateName: actions.userSettings.updateName,
	changePassword: actions.userSettings.changePassword,
	changeEmail: actions.userSettings.changeEmail,
	context: () => context
})

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(UserProfilePage);