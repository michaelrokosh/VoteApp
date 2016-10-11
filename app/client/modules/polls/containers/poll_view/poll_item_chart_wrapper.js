import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import PollItemChartWrapper from '../../components/poll_view/poll_item_chart_wrapper.jsx';
import MainLoader from '../../../core/components/layouts/main_loader.jsx';

export const composer = (props, onData) => {
	const { Collections, Meteor, LocalState } = props.context();
	const { pollItemId, isChartPreview } = props;
	1
	//для того, щоб не робити лишню підписку 
	if(isChartPreview) {
		const pollItemHandle = Meteor.subscribe('pollItems.pollItem', pollItemId);
		const pollItemOptionsHandle = Meteor.subscribe('pollItemOptions.pollItemOptionsByPollItemId', pollItemId);
		
		if(pollItemHandle.ready() && pollItemOptionsHandle.ready()) {
			const pollItem = Collections.PollItems.findOne({ _id: pollItemId });
			const pollItemOptions = Collections.PollItemOptions.find({ pollItemId: pollItemId }).fetch();
			const isuser = Meteor.user() ? true : false;
			
			onData(null, { pollItem, pollItemOptions, isuser });		
		}
	} else {
		const pollItem = Collections.PollItems.findOne({ _id: pollItemId });
		const pollItemOptions = Collections.PollItemOptions.find({ pollItemId: pollItemId }).fetch();
		const isuser = Meteor.user() ? true : false;

		onData(null, { pollItem, pollItemOptions, isuser })
	}
}

export const depsMapper = (context) => ({
	context: () => context
});

export default composeAll (
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(PollItemChartWrapper);