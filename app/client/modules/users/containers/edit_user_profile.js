import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import EditUserProfile from '../components/user_profile/edit_user_profile/edit_user_profile.jsx';
import MainLoader from '../../core/components/layouts/main_loader.jsx';

export const composer = ({ context }, onData) => {
	const { Meteor, Collections } = context();

	const user = Meteor.user();
	if(user) {
		const avatarHandle = Meteor.subscribe('avatars.userAvatar', user._id);
	
		if(avatarHandle.ready()) {
			let avatar = Collections.Avatars.findOne({userId: user._id});

			onData(null, { user, avatar })
		}
	}
}

export const depsMapper = (context, actions) => ({
	setUsername: actions.userSettings.setUsername,
	setPassword: actions.userSettings.setPassword,
	setEmail: actions.userSettings.setEmail,
	setAvatar: actions.userSettings.setAvatar,
	getPath: actions.router.getPath,
	context: () => context
})

export default composeAll (
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(EditUserProfile);