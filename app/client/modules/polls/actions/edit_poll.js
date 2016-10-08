export default {
	addNewPollItem({ Meteor, LocalState }, e, poll, pollItems) {
		e.preventDefault();
	 
	    const question = e.target.question.value;
	    const errors = {};

	    if (!question) {
	      errors.question = "Question required"
	    }

	    LocalState.set('AddNewPollItemErrors', errors);

	    if (! _.isEmpty(errors)) {
	      return;
	    }

	    const pollItemOptions = e.target.getElementsByClassName('poll-item-option');
	    let options = [];

	    for (let i = 0; i < pollItemOptions.length; i++) {
	      options.push({
	        text: pollItemOptions[i].value
	      });
	    }

	    Meteor.call('pollItems.insert', poll._id, question, options, (err, res) => {
	      if (err) {
	       	errors.methodErr = err.reason;
	       	LocalState.set('AddNewPollItemErrors', errors)
	      }
	    });
	},

	togglePrivatePoll({ Meteor }, pollId) {
      Meteor.call('polls.togglePrivate', pollId);
    }
}