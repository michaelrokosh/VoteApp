export default {
	addNewPollItem({ Meteor, LocalState, Notificator }, question, poll, pollItems , pollItemOptions) {
	    if(!question) {
	    	Notificator.error('Qestion is reqired!')
	    }

	    let options = [];
	    for (let i = 0; i < pollItemOptions.length; i++) {
	      options.push({
	        text: pollItemOptions[i].value
	      });
	    }

	    Meteor.call('pollItems.insert', poll._id, question, options, (err, res) => {
	      if (err) {
	       	Notificator.error(err.reason);
	      }
	    });
	},

	togglePrivatePoll({ Meteor }, pollId) {
      Meteor.call('polls.togglePrivate', pollId);
    },

    updateName({ Meteor }, updatedName, pollId) {
    	Meteor.call('polls.updateName', updatedName, pollId);
    },

    removePoll({ Meteor, FlowRouter }, pollId) {
    	if(confirm('Are you sure?')) {
	    	Meteor.call('polls.remove', pollId, (err) => {
	    		if(err) {
	    			console.log(err);
	    			return;
	    		}

	    		FlowRouter.go('UserPolls', { username: Meteor.user().username })
	    	});
	    }
    }
}