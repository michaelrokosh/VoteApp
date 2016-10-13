export default {
	updateText({ Meteor }, updatedText, pollItemId) { 
   	Meteor.call('pollItems.updateText', pollItemId, updatedText);
  },

 	updateDescription({ Meteor },  updatedDescription, pollItemId) {
    Meteor.call('pollItems.updateDescription', pollItemId, updatedDescription);
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

  toggleDisabled({ Meteor }, pollItem) {
  	Meteor.call('pollItems.toggleDisabled', pollItem._id, !pollItem.disabled); 
  },

  toggleShowResults({ Meteor }, pollItem) {
     Meteor.call('pollItems.toggleShowResults', pollItem._id, !pollItem.showResults); 
  },

  handleChartTypeChange({ Meteor }, chartType, pollItemId) {
      Meteor.call('pollItems.updateChartType', pollItemId, chartType);
  }
}