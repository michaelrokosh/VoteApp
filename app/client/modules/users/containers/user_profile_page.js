import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import UserProfilePage from '../components/user_profile_page/user_profile_page.jsx';

export const composer = ({ context }, onData) => {
	const { Meteor, Collections, APP_ERRORS } = context();
	
	APP_ERRORS.setDefault('ChangePassword', {});
	APP_ERRORS.setDefault('ChangeEmailAndName', {});

	const changeEmailAndNameErrors = APP_ERRORS.get('ChangeEmailAndName'); 
	const changePassErrors = APP_ERRORS.get('ChangePassword');
	
	const user = Meteor.user();
	if(user) {
		const avatarHandle = Meteor.subscribe('avatars.userAvatar', user._id);
	
		if(avatarHandle.ready()) {
			let avatar = Collections.Avatars.findOne({userId: user._id});

			onData(null, { user, avatar, changePassErrors, changeEmailAndNameErrors })
		}
	}
}

export const depsMapper = (context, actions) => ({
	updateName: actions.userSettings.updateName,
	changePassword: actions.userSettings.changePassword,
	changeEmail: actions.userSettings.changeEmail,
	changeAvatar: actions.userSettings.changeAvatar,
	clearErrors: actions.appErrors.clearErrors,
	context: () => context
})

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(UserProfilePage);