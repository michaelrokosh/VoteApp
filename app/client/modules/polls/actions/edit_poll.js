export default {
	addNewPollItem({ Meteor, APP_ERRORS }, question, poll, pollItems , pollItemOptions) {
	    const errors = {};

	    if (!question) {
	      errors.question = "Question required"
	    }

	    APP_ERRORS.set('AddNewPollItem', errors);

	    if (! _.isEmpty(errors)) {
	      return;
	    }

	    let options = [];
	    for (let i = 0; i < pollItemOptions.length; i++) {
	      options.push({
	        text: pollItemOptions[i].value
	      });
	    }

	    Meteor.call('pollItems.insert', poll._id, question, options, (err, res) => {
	      if (err) {
	       	errors.methodErr = err.reason;
	       	APP_ERRORS.set('AddNewPollItem', errors)
	      }
	    });
	},

	togglePrivatePoll({ Meteor }, pollId) {
      Meteor.call('polls.togglePrivate', pollId);
    },

    updateName({ Meteor }, updatedName, pollId) {
    	Meteor.call('polls.updateName', updatedName, pollId, (err) => {
    		if(err) {
    			console.log(err);
    		}
    	});
    }
}