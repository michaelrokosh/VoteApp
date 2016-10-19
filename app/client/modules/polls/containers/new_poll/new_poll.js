import { useDeps } from 'mantra-core';

import NewPoll from '../../components/new_poll/new_poll.jsx';
import MainLoader from '../../../core/components/layouts/main_loader.jsx';

export const depsMapper = (context, actions) => ({
	createPoll: actions.newPoll.createPoll,
	context: () => context
})

export default useDeps(depsMapper)(NewPoll);