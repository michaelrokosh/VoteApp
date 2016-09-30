import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import EditPoll from '../components/edit_poll/edit_poll.jsx';

export const composer = ({ context }, onData) => {
	const { Meteor, Collections, LocalState } = context();

	LocalState.setDefault('AddNewPollItemErrors', {});
	const errors = LocalState.get('AddNewPollItemErrors');

    const pollId = FlowRouter.getParam('_id');
	
	const pollHandle = Meteor.subscribe('poll', pollId);
    const pollItemsHandle = Meteor.subscribe('pollItems', pollId);
    const pollItemOptionsHandle = Meteor.subscribe('pollItemOptionsByPollId', pollId);

    if(pollHandle.ready() && pollItemsHandle.ready() && pollItemOptionsHandle.ready()) {
    	const poll = Collections.Polls.findOne({ _id: pollId });
    	const pollItems = Collections.PollItems.find({ pollId: pollId }).fetch();
    	const pollItemOptions = Collections.PollItemOptions.find({ pollId: pollId }).fetch();

       	onData(null, { poll, pollItems, pollItemOptions, errors });
    }
}

export const depsMapper = (context, actions) => ({
	addNewPollItem: actions.EditPoll.addNewPollItem,
	context: () => context
});

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(EditPoll);