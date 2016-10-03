import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import PollView from '../components/poll_view/poll_view.jsx';

export const composer = ({context}, onData) => {
	const { Meteor, FlowRouter } = context();

	const pollId = FlowRouter.getParam('_id');

	const pollHandle = Meteor.subscribe('poll', pollId);
	const pollItemsHandle = Meteor.subscribe('pollItems', pollId);
	const pollItemOptionsHandle = Meteor.subscribe('pollItemOptionsByPollId', pollId);

	if (pollHandle.ready() && pollItemsHandle.ready() && pollItemOptionsHandle.ready()) {
		const poll = Polls.findOne({ _id: pollId });
	    const activePollItems = PollItems.find({ 
	        pollId: pollId,
	        active: true
	    }).fetch();

	    const pollItemOptions = PollItemOptions.find({ pollId: pollId }).fetch();
	   
	    let isUser = false;
	    if(Meteor.user()) {
	    	isUser = true;
	    }

		onData(null, { poll, activePollItems, pollItemOptions, isUser })
	}
}

export const depsMapper = (context, actions) => ({
	context: () => context
});

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(PollView);