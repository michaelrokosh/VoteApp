import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import BarsChart from '../components/bars_chart.jsx';
import MainLoader from '../../core/components/layouts/main_loader.jsx';

export const composer = (props, onData) => {
	const { Collections } = props.context();
	const { pollItemId } = props;
	const pollItemOptions = Collections.PollItemOptions.find({ pollItemId: pollItemId }).fetch();
	const pollItem = Collections.PollItems.findOne({ _id: pollItemId })

	onData(null, { pollItemOptions, pollItem })
}

export const depsMapper = (context) => ({
	context: () => context
});

export default composeAll (
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(BarsChart);