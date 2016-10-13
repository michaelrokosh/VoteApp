import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import PollItemPage from '../../components/poll_item_page/poll_item_page.jsx';

export const composer = ({ context }, onData) => {
	const { Meteor, Collections, FlowRouter } = context();
	const pollItemId = FlowRouter.getParam('pollItemId');
	
	const pollItemHandle = Meteor.subscribe('pollItems.pollItem', pollItemId);
	if(pollItemHandle.ready()) {
		const pollItem = Collections.PollItems.findOne({ _id: pollItemId });

		onData(null, { pollItem });
	}
}

export const depsMapper = (context) => ({
	context: () => context
})

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(PollItemPage);