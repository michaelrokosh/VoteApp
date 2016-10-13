import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import MainHeader from '../components/layouts/main_header.jsx';

export const composer = ({ context }, onData) => {
	const { Meteor } = context();
	const user = Meteor.user();
	if(!user) {
		onData(null, {});
	}

	onData(null, {user});
}

export const depsMapper = (context, actions) => ({
	handleLogout: actions.auth.handleLogout,
	getPath: actions.router.getPath,
	context: () => context
})

export default composeAll(
	composeWithTracker(composer),
	useDeps(depsMapper)
)(MainHeader);