import { useDeps } from 'mantra-core';

import EditPollItemOption from '../../components/edit_poll/edit_poll_item_option.jsx';

export const depsMapper = (context, actions) => ({
	updateText: actions.editPollItemOption.updateText,
	handleKeyUp: actions.editPollItemOption.handleKeyUp,
	removePollItemOption: actions.editPollItemOption.removePollItemOption,
	context: () => context
});

export default useDeps(depsMapper)(EditPollItemOption);