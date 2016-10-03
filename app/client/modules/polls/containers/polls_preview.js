import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import PollsPreview from '../components/poll_preview/polls_preview.jsx'

export const composer = (props, onData) => {
	const { Meteor, FlowRouter, Collections } = props.context();
	const { type } = props;


	if(type === 'userPolls') {
		let selector = {};
		selector.userId = Meteor.userId();

		if(Meteor.subscribe('userPollsByUsername', FlowRouter.getParam('username')).ready()) {
			const userId = Meteor.userId();
			const polls = Collections.Polls.find(selector, { sort: {createdAt: -1} }).fetch();
			onData(null, { polls, userId });
		}
	} else {
		if(Meteor.subscribe('polls').redy()) {
			const polls = Collections.find({}, { sort: {createdAt: -1} }).fetch();
			onData(null, { polls, forUser })
		}
	}

} 

export const depsMapper = (context, actions) => ({
	togglePrivatePoll: actions.EditPoll.togglePrivatePoll,
	context: () => context 
})

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(PollsPreview);