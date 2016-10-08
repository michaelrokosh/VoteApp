import { Meteor } from 'meteor/meteor';

import PollItems from '../../lib/collections/poll_items.jsx';
import PollItemOptions from '../../lib/collections/poll_item_options.jsx';
import Polls from '../../lib/collections/polls.jsx';
import Votes from '../../lib/collections/votes.jsx';

export default () => {
	Meteor.methods({
	  'pollItems.insert'(pollId, text, options) {
	    check(pollId, String);
	    check(text, String);
	    check(options, Match.Optional([{
	      text: String
	    }]));

	    const userId = Meteor.userId();

	    PollItems.insert({
	      text: text,
	      userId: userId,
	      pollId: pollId,
	      active: false,
	      showResults: false,
	      disabled: true,
	      chartType: 'bars'
	    }, (err, pollItemId) => {
	      if (!err && options.length) {
	        for (let i = 0; i < options.length; i++) {
	          PollItemOptions.insert({
	            userId: userId,
	            pollItemId: pollItemId,
	            pollId: pollId,
	            text: options[i].text,
	            rank: i + 1,
	            votes: 0
	          });
	        }
	      }
	    });
	  },

	  'pollItems.updateText'(pollItemId, updatedText) {
	    check(pollItemId, String);
	    check(updatedText, String);

	    const pollItem = PollItems.findOne({ _id: pollItemId });

	    if (!pollItem) {
	      throw new Meteor.Error('not-found');
	    }

	    if (Meteor.userId() !== pollItem.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    PollItems.update({ _id: pollItemId }, { $set: { text: updatedText } }, { autoConvert: false });
	  },

	  'pollItems.updateDescription'(pollItemId, updatedDescription) {
	    check(pollItemId, String);
	    check(updatedDescription, String);

	    const pollItem = PollItems.findOne({ _id: pollItemId });

	    if (!pollItem) {
	      throw new Meteor.Error('not-found');
	    }

	    if (Meteor.userId() !== pollItem.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    PollItems.update({ _id: pollItemId }, { $set: { description: updatedDescription } }, { autoConvert: false });
	  },

	  'pollItems.toggleActive'(pollItemId, setActive) {
	    const pollItem = PollItems.findOne({ _id: pollItemId });
	    const poll = Polls.findOne({ _id: pollItem.pollId });

	    if (Meteor.userId() === poll.userId) {
	      PollItems.update({ _id: pollItemId }, { $set: { active: setActive }});
	    } else {
	      throw new Meteor.Error('not-authorized');
	    }
	  },

	  'pollItems.toggleDisabled'(pollItemId, setDisabled) {
	    const pollItem = PollItems.findOne({ _id: pollItemId });
	    const poll = Polls.findOne({ _id: pollItem.pollId });

	    if (Meteor.userId() === poll.userId) {
	      PollItems.update({ _id: pollItemId }, { $set: { disabled: setDisabled }});
	    } else {
	      throw new Meteor.Error('not-authorized');
	    }
	  },

	  'pollItems.toggleShowResults'(pollItemId, setShowResults) {
	    const pollItem = PollItems.findOne({ _id: pollItemId });
	    const poll = Polls.findOne({ _id: pollItem.pollId });

	    if (Meteor.userId() === poll.userId) {
	      PollItems.update({ _id: pollItemId }, { $set: { showResults: setShowResults }});
	    } else {
	      throw new Meteor.Error('not-authorized');
	    }
	  },

	  'pollItems.removeById'(pollItemId) {
	    const pollItem = PollItems.findOne({ _id: pollItemId });
	    const poll = Polls.findOne({ _id: pollItem.pollId });

	    if (Meteor.userId() === poll.userId) {
	      PollItemOptions.remove({pollItemId: pollItemId}, function (err) {
	        if (!err) {
	          Votes.remove({ pollItemId: pollItemId });
	          PollItems.remove({ _id: pollItemId });
	        }
	      });
	    } else {
	      throw new Meteor.Error('not-authorized');
	    }
	  },

	  'pollItems.updateChartType'(pollItemId, type) {
	    check(pollItemId, String);
	    if (type !== 'pie' && type !== 'bars') {
	      throw new Meteor.Error('unknown-chart-type');
	    }

	    const pollItem = PollItems.findOne({ _id: pollItemId });
	    const poll = Polls.findOne({ _id: pollItem.pollId });
	    if (Meteor.userId() === poll.userId) {
	      PollItems.update({ _id: pollItemId }, { $set: { chartType: type } });
	    }
	  }
	});
}