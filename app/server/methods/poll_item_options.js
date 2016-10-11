import { Meteor } from 'meteor/meteor';

import PollItemOptions from '../../lib/collections/poll_item_options.jsx';
import PollItems from '../../lib/collections/poll_items.jsx';
import Polls from '../../lib/collections/polls.jsx';

export default () => {
	Meteor.methods({
	  'pollItemOptions.insert'(pollItemId, text) {
	    check(pollItemId, Match.Optional(String));
	    check(text, Match.Optional(String));
	    const pollItem = PollItems.findOne({ _id: pollItemId });
	    const poll = Polls.findOne({ _id: pollItem.pollId });
	    const userId = Meteor.userId();
	    check(pollItem, Object);
	    check(poll, Object);
	    check(userId, String);

	    if (!userId || userId !== poll.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    const lastPollItemOption = PollItemOptions.findOne({ pollItemId: pollItemId }, { sort: { rank: -1 } });
	    const lastRank = lastPollItemOption ? lastPollItemOption.rank : 0;
	    PollItemOptions.insert({
	      userId: userId,
	      pollId: poll._id,
	      text: text || '',
	      pollItemId: pollItemId,
	      rank: lastRank + 1,
	      votes: 0
	    });
	  },

	  'pollItemOptions.removeById'(pollItemOptionId) {
	    check(pollItemOptionId, String);

	    const option = PollItemOptions.findOne({ _id: pollItemOptionId });

	    if (!option) {
	      throw new Meteor.Error('not-found');
	    }

	    if (Meteor.userId() && Meteor.userId() === option.userId) {
	      PollItemOptions.remove({ _id: pollItemOptionId });
	    } else {
	      throw new Meteor.Error('not-authorized');
	    }
	  },

	  'pollItemOptions.updateText'(pollItemOptionId, updatedText) {
	    check(pollItemOptionId, String);
	    check(updatedText, String);

	    const option = PollItemOptions.findOne({ _id: pollItemOptionId });

	    if (!option) {
	      throw new Meteor.Error('not-found');
	    }

	    if (Meteor.userId() && Meteor.userId() === option.userId) {
	      PollItemOptions.update({ _id: pollItemOptionId }, { $set: { text: updatedText } }, { autoConvert: false });
	    } else {
	      throw new Meteor.Error('not-authorized');
	    }
	  }
	});
}