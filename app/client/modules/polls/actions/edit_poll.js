export default {
	addNewPollItem({Meteor, LocalState}, e, poll, pollItems) {
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

	    Meteor.call('addNewPollItem', poll._id, question, options, (err, res) => {
	      if (err) {
	       	errors.methodErr = err.reason;
	       	LocalState.set('AddNewPollItemErrors', errors)
	      }
	    });
	},

	updateText({ Meteor }, e, pollItemId) { 
    	const updatedText = e.target.value;
   		Meteor.call('PollItems/updateText', pollItemId, updatedText);
  	},

	handleKeyUp({}, e, pollItemId) {
	    if (e.which === 13) {
	      this.updateText(e, pollItemId);
	    }
	},

 	updateDescription({ Meteor },  e, pollItemId) {
   		const updatedDescription = e.target.value;
    	Meteor.call('PollItems/updateDescription', pollItemId, updatedDescription);
  	},

  	handleDescriptionKeyUp({}, e, pollItemId) {
    	if (e.which === 13) {
      		this.updateDescription(e, pollItemId);
    	}
  	},

  	removePollItem({ Meteor }, pollItemId) {
    	Meteor.call('PollItems/removeById', pollItemId);
  	},

  	addPollItemOption({ Meteor }, e, pollItemId) {
    	Meteor.call('PollItemOptions/insert', pollItemId);
  	},

  	toggleActive({ Meteor }, e, pollItem) {
    	Meteor.call('PollItems/toggleActive', pollItem._id, !pollItem.active); 
  	},

	toggleDisabled({ Meteor }, e, pollItem) {
		Meteor.call('PollItems/toggleDisabled', pollItem._id, !pollItem.disabled); 
	},

	toggleShowResults({ Meteor }, e, pollItem) {
	   Meteor.call('PollItems/toggleShowResults', pollItem._id, !pollItem.showResults); 
	},

	handleChartTypeChange({ Meteor }, e, pollItemId) {
	    Meteor.call('PollItems/updateChartType', pollItemId, e.target.value);
	}
}