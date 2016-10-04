import { Meteor } from 'meteor/meteor';

import Votes from '../../lib/collections/votes.jsx';
import Polls from '../../lib/collections/polls.jsx';
import PollItemOptions from '../../lib/collections/poll_item_options.jsx';
import PollItems from '../../lib/collections/poll_items.jsx';

export default () => {
	Meteor.methods({
	  vote: (pollItemOptionId) => {
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
	  },

	  getVotes: (pollItemId) => {
	    const votes = Votes.find({ pollItemId: pollItemId }, { sort: { createdAt: -1 } }).fetch();
	    let mappedVotes = _.map(votes, function (vote) {
	      let voter = Meteor.users.findOne({ _id: vote.userId });
	      vote.voter = voter;
	      vote.pollItemOption = PollItemOptions.findOne({ _id: vote.pollItemOptionId });
	      return vote;
	    });

	    return mappedVotes;
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

	    removed: function (oldDoc) {
	      if (!initializing) {
	        Polls.update({ _id: oldDoc.pollId }, { $inc: { votesTotal: -1 }});
	        PollItemOptions.update({ _id: oldDoc.pollItemOptionId }, { $inc: { votes: -1 }});
	      }
	    }
	  });
	  initializing = false;
	}
}
