import { Meteor } from 'meteor/meteor';
import Polls from '../../lib/collections/polls.jsx';

export default {
	checkPoll(poll) {
		if(!poll) {
	  		throw new Meteor.Error('not-found');
	  	}

	  	if(Meteor.userId() !== poll.userId) {
	      throw new Meteor.Error('not-authorized');
	  	}
	}
}