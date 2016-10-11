import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import PollsPreview from '../../components/polls_preview/polls_preview.jsx'
import MainLoader from '../../../core/components/layouts/main_loader.jsx';

export const composer = (props, onData) => {
	const { Meteor, FlowRouter, Collections } = props.context();
	const { type } = props;


	if(type === 'userPolls') {
		let selector = {};
		selector.userId = Meteor.userId();

		if(Meteor.subscribe('polls.userPollsByUsername', FlowRouter.getParam('username')).ready()) {
			const userId = Meteor.userId();
			const polls = Collections.Polls.find(selector, { sort: {createdAt: -1} }).fetch();
			onData(null, { polls, userId });
		}
	} else if(type === 'publicPolls') {
		if(Meteor.subscribe('polls.polls').ready()) {
			const polls = Collections.Polls.find({}, { sort: {createdAt: -1} }).fetch();
			onData(null, { polls })
		}
	} else {
		return;
	}
} 

export const depsMapper = (context, actions) => ({
	togglePrivatePoll: actions.editPoll.togglePrivatePoll,
    getPath: actions.router.getPath,
	context: () => context 
});

export default composeAll (
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(PollsPreview);