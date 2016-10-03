export default {
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

  	toggleActive({ Meteor }, pollItem) {
    	Meteor.call('PollItems/toggleActive', pollItem._id, !pollItem.active); 
  	},

  toggleDisabled({ Meteor }, e, pollItem) {
  	Meteor.call('PollItems/toggleDisabled', pollItem._id, !pollItem.disabled); 
  },

  toggleShowResults({ Meteor }, pollItem) {
     Meteor.call('PollItems/toggleShowResults', pollItem._id, !pollItem.showResults); 
  },

  handleChartTypeChange({ Meteor }, e, pollItemId) {
      Meteor.call('PollItems/updateChartType', pollItemId, e.target.value);
  }
}