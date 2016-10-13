import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import PollItemChartWrapper from '../../components/poll_item_page/poll_item_chart_wrapper.jsx';
import MainLoader from '../../../core/components/layouts/main_loader.jsx';

export const composer = ({context, pollItemId, isChartPreview} , onData) => {
	const { Collections, Meteor } = context();
	let pollItemHandle;
	let pollItemOptionsHandle;

	//для того, щоб не робити лишню підписку 
	if(isChartPreview) {
		pollItemHandle = Meteor.subscribe('pollItems.pollItem', pollItemId);
		pollItemOptionsHandle = Meteor.subscribe('pollItemOptions.pollItemOptionsByPollItemId', pollItemId);
	}

	if(!isChartPreview || pollItemHandle.ready() || pollItemOptionsHandle.ready()) {
		const pollItem = Collections.PollItems.findOne({ _id: pollItemId });
		const pollItemOptions = Collections.PollItemOptions.find({ pollItemId: pollItemId }).fetch();

		const isuser = !!Meteor.userId();
		onData(null, { pollItem, pollItemOptions, isuser });		
	}
}

export const depsMapper = (context) => ({
	context: () => context
});

export default composeAll (
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(PollItemChartWrapper);