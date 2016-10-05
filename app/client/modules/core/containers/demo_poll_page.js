import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import DemoPollPage from '../components/public/demo_poll_page.jsx';

export const composer = (props, onData) => {
	const { Meteor, Collections } = props.context();
	const userId = Meteor.userId();
	const pollHandle = Meteor.subscribe('poll', props.pollId);
	if(pollHandle.ready()) {
		const poll = Collections.Polls.findOne({ _id: props.pollId });
		onData(null, { userId, poll })
	}
}

export const depsMapper = (context) => ({
	context: () => context
})

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(DemoPollPage);