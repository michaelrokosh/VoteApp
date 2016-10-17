import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import EditPollItem from '../../components/edit_poll/edit_poll_item.jsx';

export const composer = ({ context, pollItem } , onData) => {
	const { Meteor, FlowRouter, Collections, APP_ERRORS } = context();
	const pollItemId = pollItem._id;

	if(Meteor.subscribe('votes.votesByPollItemId', pollItemId).ready()) {
     	const votes = Collections.Votes.find({ pollItemId: pollItemId }, { sort: { createdAt: 1 } }).fetch();
    	const pollItemOptions = Collections.PollItemOptions.find({ pollItemId: pollItemId }).fetch();
  	    const pollItem = Collections.PollItems.findOne({ _id: pollItemId })

  	    APP_ERRORS.setDefault('EditPollItem', {});
  	    const errors = APP_ERRORS.get('EditPollItem');

		onData(null, { votes, pollItemOptions, pollItem, errors });
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
    clearErrors: actions.appErrors.clearErrors,
	context: () => context
})

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(EditPollItem);