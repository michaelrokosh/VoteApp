import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import MainHeader from '../components/layouts/main_header.jsx';

export const composer = ({context}, onData) => {
	const {Meteor} = context();
	const isUser = Meteor.userId() ? true : false;
	onData(null, {isUser});
}

export const depsMapper = (context, actions) => ({
	handleLogout: actions.auth.handleLogout,
	context: () => context
})

export default composeAll(
	composeWithTracker(composer),
	useDeps(depsMapper)
)(MainHeader);