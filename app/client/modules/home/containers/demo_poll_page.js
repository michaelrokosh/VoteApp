import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import DemoPollPage from '../components/demo_poll_page.jsx';
import MainLoader from '../../core/components/layouts/main_loader.jsx';

export const composer = ({ context, pollId } , onData) => {
	const { Meteor, Collections } = context();
	const userId = Meteor.userId();

	const pollHandle = Meteor.subscribe('polls.poll', pollId);
	if(pollHandle.ready()) {
		const poll = Collections.Polls.findOne({ _id: pollId });
   		
   		onData(null, { userId, poll })
	}
}

export const depsMapper = (context) => ({
	context: () => context
})

export default composeAll (
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(DemoPollPage);