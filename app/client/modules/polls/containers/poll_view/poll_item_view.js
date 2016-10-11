import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import PollItemView from '../../components/poll_view/poll_item_view.jsx';
import MainLoader from '../../../core/components/layouts/main_loader.jsx';

export const composer = (props, onData) => {
	const { Collections } = props.context();
	const { pollItem } = props;
	const pollItemOptions = Collections.PollItemOptions.find({ pollItemId: pollItem._id }).fetch(); 
	
	onData(null, { pollItemOptions })
}

export const depsMapper = (context) => ({
	context: () => context
})

export default composeAll (
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(PollItemView);