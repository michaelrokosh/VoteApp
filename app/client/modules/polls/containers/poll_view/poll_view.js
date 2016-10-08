import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import PollView from '../../components/poll_view/poll_view.jsx';
import MainLoader from '../../../core/components/layouts/main_loader.jsx';

export const composer = (props, onData) => {
	const { Meteor, FlowRouter, Collections } = props.context();

	let pollId = FlowRouter.getParam('_id');
	if(!pollId) {
		pollId = props.pollId;
	}

	const pollHandle = Meteor.subscribe('polls.poll', pollId);
	const pollItemsHandle = Meteor.subscribe('pollItems.pollItems', pollId);
	const pollItemOptionsHandle = Meteor.subscribe('pollItemOptions.pollItemOptionsByPollId', pollId);

	if (pollHandle.ready() && pollItemsHandle.ready() && pollItemOptionsHandle.ready()) {
		const poll = Collections.Polls.findOne({ _id: pollId });
	    const activePollItems = Collections.PollItems.find({ 
	        pollId: pollId,
	        active: true
	    }).fetch();

	    const pollItemOptions = Collections.PollItemOptions.find({ pollId: pollId }).fetch();
	   
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
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(PollView);