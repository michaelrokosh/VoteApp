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
	updateText: actions.EditPollItem.updateText,
	handleKeyUp: actions.EditPollItem.handleKeyUp,
	updateDescription: actions.EditPollItem.updateDescription,
	handleDescriptionKeyUp: actions.EditPollItem.handleDescriptionKeyUp,
	removePollItem: actions.EditPollItem.removePollItem,
	addPollItemOption: actions.EditPollItem.addPollItemOption,
	toggleActive: actions.EditPollItem.toggleActive,
	toggleDisabled: actions.EditPollItem.toggleDisabled,
	toggleShowResults: actions.EditPollItem.toggleShowResults,
	handleChartTypeChange: actions.EditPollItem.handleChartTypeChange,
	context: () => context
})

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(EditPollItem);