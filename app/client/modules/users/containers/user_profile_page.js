import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import UserProfilePage from '../components/user_profile_page.jsx';

export const composer = ({ context }, onData) => {
	const { Meteor, APP_ERRORS } = context();
	const user = Meteor.user();
	
	APP_ERRORS.setDefault('ChangePassword', {});
	const errors = APP_ERRORS.get('ChangePassword');
	
	if(user) {
		onData(null, { user, errors })
	}
}

export const depsMapper = (context, actions) => ({
	updateName: actions.userSettings.updateName,
	changePassword: actions.userSettings.changePassword,
	context: () => context
})

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(UserProfilePage);