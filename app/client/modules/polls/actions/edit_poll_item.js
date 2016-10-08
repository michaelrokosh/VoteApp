export default {
	updateText({ Meteor }, e, pollItemId) { 
    	const updatedText = e.target.value;
   		Meteor.call('pollItems.updateText', pollItemId, updatedText);
  	},

	handleKeyUp({}, e, pollItemId) {
	    if (e.which === 13) {
	      this.updateText(e, pollItemId);
	    }
	},

 	updateDescription({ Meteor },  e, pollItemId) {
   	const updatedDescription = e.target.value;
    Meteor.call('pollItems.updateDescription', pollItemId, updatedDescription);
  },

  handleDescriptionKeyUp({}, e, pollItemId) {
  	if (e.which === 13) {
     		this.updateDescription(e, pollItemId);
   	}
  },

	removePollItem({ Meteor }, pollItemId) {
  	Meteor.call('pollItems.removeById', pollItemId);
	},

	addPollItemOption({ Meteor }, pollItemId) {
  	Meteor.call('pollItemOptions.insert', pollItemId);
	},

	toggleActive({ Meteor }, pollItem) {
  	Meteor.call('pollItems.toggleActive', pollItem._id, !pollItem.active); 
	},

  toggleDisabled({ Meteor }, e, pollItem) {
  	Meteor.call('pollItems.toggleDisabled', pollItem._id, !pollItem.disabled); 
  },

  toggleShowResults({ Meteor }, pollItem) {
     Meteor.call('pollItems.toggleShowResults', pollItem._id, !pollItem.showResults); 
  },

  handleChartTypeChange({ Meteor }, e, pollItemId) {
      Meteor.call('pollItems.updateChartType', pollItemId, e.target.value);
  }
}