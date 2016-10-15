import Polls from '../../lib/collections/polls.jsx';

import helpers from '../lib/helpers.js';

export default () => {
	Meteor.methods({
	  'polls.togglePrivate'(pollId) {
	    check(pollId, String);

	    const poll = Polls.findOne({ _id: pollId });
	    helpers.checkPoll(poll);

	    Polls.update({ _id: pollId }, { 
	    	$set: { 
	    		isPrivate: !poll.isPrivate 
	    	} 
	    });
	  },

	  'polls.updateName'(updatedName, pollId) {
		console.log(updatedName)
	  	check(pollId, String);
	  	check(updatedName, String);

	  	const poll = Polls.findOne(pollId);
	  	helpers.checkPoll(poll);

	  	Polls.update({_id: pollId}, {
	  		$set: {
	  			name: updatedName
	  		}
	  	})
	  },

	  'polls.remove'(pollId) {
	  	check(pollId, String);

	  	const poll = Polls.findOne(pollId);
	  	helpers.checkPoll(poll);

	  	Polls.remove(pollId);
	  }
	});
}