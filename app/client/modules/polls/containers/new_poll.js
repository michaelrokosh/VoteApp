import { useDeps, composeWithTracker, composeAll } from 'mantra-core';


import NewPoll from '../components/new_poll/new_poll.jsx';

export const composer = ({ context }, onData) => {
	const { LocalState } = context();

	LocalState.setDefault('CreatePollErrors', {});
	const errors = LocalState.get('CreatePollErrors');
	onData(null, {errors});
}

export const depsMapper = (context, actions) => ({
	createPoll: actions.NewPoll.createPoll,
	context: () => context
})

export default composeAll ( 
	composeWithTracker(composer),
	useDeps(depsMapper)
)(NewPoll);