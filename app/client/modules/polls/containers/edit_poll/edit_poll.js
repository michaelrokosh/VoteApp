import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import EditPoll from '../../components/edit_poll/edit_poll.jsx';
import MainLoader from '../../../core/components/layouts/main_loader.jsx';

export const composer = (props, onData) => {
	const { Meteor, Collections, APP_ERRORS } = props.context();

	APP_ERRORS.setDefault('AddNewPollItem', {});
	const errors = APP_ERRORS.get('AddNewPollItem');

    let pollId = FlowRouter.getParam('_id');
    if(!pollId) {
    	pollId  = props.pollId;
    }

    const pollHandle = Meteor.subscribe('polls.poll', pollId);
    const pollItemsHandle = Meteor.subscribe('pollItems.pollItems', pollId);
    const pollItemOptionsHandle = Meteor.subscribe('pollItemOptions.pollItemOptionsByPollId', pollId);

    if(pollHandle.ready() && pollItemsHandle.ready() && pollItemOptionsHandle.ready()) {
    	const poll = Collections.Polls.findOne({ _id: pollId });
    	const pollItems = Collections.PollItems.find({ pollId: pollId }).fetch();
    	const pollItemOptions = Collections.PollItemOptions.find({ pollId: pollId }).fetch();

       	onData(null, { poll, pollItems, pollItemOptions, errors });
    }
}

export const depsMapper = (context, actions) => ({
	addNewPollItem: actions.editPoll.addNewPollItem,
    getPath: actions.router.getPath,
	context: () => context
});

export default composeAll (
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(EditPoll);