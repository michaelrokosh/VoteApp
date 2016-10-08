import { Meteor } from 'meteor/meteor';

import Votes from '../../lib/collections/votes.jsx';
import Polls from '../../lib/collections/polls.jsx';
import PollItemOptions from '../../lib/collections/poll_item_options.jsx';
import PollItems from '../../lib/collections/poll_items.jsx';

export default () => {
	Meteor.methods({
	  'votes.vote'(pollItemOptionId) {
	    const pollItemOption = PollItemOptions.findOne({ _id: pollItemOptionId});
	    const poll = Polls.findOne({ _id: pollItemOption.pollId });
	    const pollItem = PollItems.findOne({ _id: pollItemOption.pollItemId });
	    const userId = Meteor.userId();
	    Votes.remove({ 
	      userId: userId,
	      pollItemId: pollItem._id
	    }, function () {
	      Votes.insert({
	        userId: userId,
	        pollId: poll._id,
	        pollItemId: pollItem._id,
	        pollItemOptionId: pollItemOptionId,
	        createdAt: new Date
	      });
	    });
	  }
	});

	if (Meteor.isServer) {
	  let initializing = true;
	  Votes.find().observe({
	    added: function (doc) {
	      if (!initializing) {
	        Polls.update({ _id: doc.pollId }, { $inc: { votesTotal: 1 }});
	        PollItemOptions.update({ _id: doc.pollItemOptionId }, { $inc: { votes: 1 }});
	      }
	    },

	    removed(oldDoc) {
	      if (!initializing) {
	        Polls.update({ _id: oldDoc.pollId }, { $inc: { votesTotal: -1 }});
	        PollItemOptions.update({ _id: oldDoc.pollItemOptionId }, { $inc: { votes: -1 }});
	      }
	    }
	  });
	  initializing = false;
	}
}
