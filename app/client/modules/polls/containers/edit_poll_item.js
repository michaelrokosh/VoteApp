import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import EditPollItem from '../components/edit_poll/edit_poll_item.jsx';

export const composer = (props, onData) => {
	const { Meteor, FlowRouter, Collections } = props.context();
	const pollItemId = props.pollItem._id;

	if(Meteor.subscribe('votesByPollItemId', pollItemId).ready()) {
     	const votes = Collections.Votes.find({ pollItemId: pollItemId }, { sort: { createdAt: 1 } }).fetch();
    	const pollItemOptions = Collections.PollItemOptions.find({ pollItemId: pollItemId }).fetch();
  	    const pollItem = Collections.PollItems.findOne({ _id: pollItemId })
		
		onData(null, { votes, pollItemOptions, pollItem });
	}    
}

export const depsMapper = (context, actions) => ({
	updateText: actions.EditPoll.updateText,
	handleKeyUp: actions.EditPoll.handleKeyUp,
	updateDescription: actions.EditPoll.updateDescription,
	handleDescriptionKeyUp: actions.EditPoll.handleDescriptionKeyUp,
	removePollItem: actions.EditPoll.removePollItem,
	addPollItemOption: actions.EditPoll.addPollItemOption,
	toggleActive: actions.EditPoll.toggleActive,
	toggleDisabled: actions.EditPoll.toggleDisabled,
	toggleShowResults: actions.toggleShowResults,
	handleChartTypeChange: actions.EditPoll.handleChartTypeChange,
	context: () => context
})

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(EditPollItem);