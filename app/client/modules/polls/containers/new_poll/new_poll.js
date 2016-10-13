import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import NewPoll from '../../components/new_poll/new_poll.jsx';
import MainLoader from '../../../core/components/layouts/main_loader.jsx';

export const composer = ({ context }, onData) => {
	const { APP_ERRORS } = context();

	APP_ERRORS.setDefault('CreatePoll', {});
	const errors = APP_ERRORS.get('CreatePollErrors');
	
	onData(null, { errors });
}

export const depsMapper = (context, actions) => ({
	createPoll: actions.newPoll.createPoll,
	context: () => context
})

export default composeAll ( 
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(NewPoll);