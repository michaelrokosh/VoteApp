import { Meteor } from 'meteor/meteor';

import Polls from '../../lib/collections/polls.jsx';

export default () => {
	Meteor.methods({
	  'polls.togglePrivate'(pollId) {
	    check(pollId, String);

	    const poll = Polls.findOne({ _id: pollId });

	    if (!poll) {
	      throw new Meteor.Error('not-found');
	    }

	    if (Meteor.userId() !== poll.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    Polls.update({ _id: pollId }, { $set: { isPrivate: !poll.isPrivate } });
	  }
	});
}