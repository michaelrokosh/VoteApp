import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import PollItemOptionView from '../components/poll_view/poll_item_option_view.jsx';

export const composer = (props, onData) => {
	const { Meteor, Collections } = props.context();
	const { pollItemOption } = props;

	if(Meteor.subscribe('vote', pollItemOption._id).ready()) {
		const pollItem = Collections.PollItems.findOne({ _id: pollItemOption.pollItemId });
		const vote = Collections.Votes.findOne({ 
	        userId: Meteor.userId(),
	        pollItemOptionId: pollItemOption._id 
	    })
		onData(null, { pollItem, vote });
	}
}

export const depsMapper = (context, actions) => ({
	context: () => context
});

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(PollItemOptionView);