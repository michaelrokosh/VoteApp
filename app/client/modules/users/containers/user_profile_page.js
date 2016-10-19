import { useDeps, composeWithTracker, composeAll } from 'mantra-core';


import UserProfilePage from '../components/user_profile/user_profile_page.jsx';
import MainLoader from '../../core/components/layouts/main_loader.jsx';

export const composer = ({ context }, onData) => {
	const { Meteor, FlowRouter, Collections } = context();
	const username = FlowRouter.getParam('username');

	const userHandle = Meteor.subscribe('users.userByUsername', username);

	if(userHandle.ready()) {
		const user = Meteor.users.findOne({ username: username });
		if(user) {
			const avatarHandle = Meteor.subscribe('avatars.userAvatar', user._id);
			if(avatarHandle.ready()) {
				const avatar = Collections.Avatars.findOne({userId: user._id});
				onData(null,  { user, avatar })
			}
		}
	}
}

export const depsMapper = (context, actions) => ({
	context: () => context
});

export default composeAll (
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(UserProfilePage);