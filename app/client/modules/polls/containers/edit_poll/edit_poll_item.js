import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import EditPollItem from '../../components/edit_poll/edit_poll_item.jsx';

export const composer = (props, onData) => {
	const { Meteor, FlowRouter, Collections } = props.context();
	const pollItemId = props.pollItem._id;

	if(Meteor.subscribe('votes.votesByPollItemId', pollItemId).ready()) {
     	const votes = Collections.Votes.find({ pollItemId: pollItemId }, { sort: { createdAt: 1 } }).fetch();
    	const pollItemOptions = Collections.PollItemOptions.find({ pollItemId: pollItemId }).fetch();
  	    const pollItem = Collections.PollItems.findOne({ _id: pollItemId })
		
		onData(null, { votes, pollItemOptions, pollItem });
	}    
}

export const depsMapper = (context, actions) => ({
	updateText: actions.editPollItem.updateText,
	handleKeyUp: actions.editPollItem.handleKeyUp,
	updateDescription: actions.editPollItem.updateDescription,
	handleDescriptionKeyUp: actions.editPollItem.handleDescriptionKeyUp,
	removePollItem: actions.editPollItem.removePollItem,
	addPollItemOption: actions.editPollItem.addPollItemOption,
	toggleActive: actions.editPollItem.toggleActive,
	toggleDisabled: actions.editPollItem.toggleDisabled,
	toggleShowResults: actions.editPollItem.toggleShowResults,
	handleChartTypeChange: actions.editPollItem.handleChartTypeChange,
    getPath: actions.router.getPath,
	context: () => context
})

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(EditPollItem);