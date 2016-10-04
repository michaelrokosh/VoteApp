import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import PollItemChartWrapper from '../components/poll_view/poll_item_chart_wrapper.jsx';

export const composer = (props, onData) => {
	const { Collections } = props.context();
	const { pollItemId } = props;

	const pollItem = Collections.PollItems.findOne({ _id: pollItemId });
	const pollItemOptions = Collections.PollItemOptions.find({ pollItemId: pollItemId }).fetch();
	const isuser = Meteor.user() ? true : false;

	onData(null, { pollItem, pollItemOptions, isuser })
}

export const depsMapper = (context) => ({
	context: () => context
});

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(PollItemChartWrapper);