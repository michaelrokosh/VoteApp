export default {
	updateText({ Meteor, LocalState, Notificator }, updatedText, pollItemId) { 
    Meteor.call('pollItems.updateText', pollItemId, updatedText, (err) => {
      if(err) {
   	    Notificator.error(err.reason);
      }
    });
  },

 	updateDescription({ Meteor, LocalState, Notificator },  updatedDescription, pollItemId) {

    Meteor.call('pollItems.updateDescription', pollItemId, updatedDescription,  (err) => {
      if(err) {
        Notificator.error(err.reason);
      }
    })
  },

	removePollItem({ Meteor, LocalState, Notificator }, pollItemId) {
    Meteor.call('pollItems.removeById', pollItemId,  (err) => {
      if(err) {
        Notificator.error(err.reason);
      }
    });
	},

	addPollItemOption({ Meteor, LocalState, Notificator }, pollItemId) {
    Meteor.call('pollItemOptions.insert', pollItemId,  (err) => {
      if(err) {
  	    Notificator.error(err.reason);
      }
    });
	},

	toggleActive({ Meteor, LocalState }, pollItem) {
  	Meteor.call('pollItems.toggleActive', pollItem._id, !pollItem.active,  (err) => {
      if(err) {
        Notificator.error(err.reason);
      }
    }); 
	},

  toggleDisabled({ Meteor, LocalState, Notificator }, pollItem) {
  	Meteor.call('pollItems.toggleDisabled', pollItem._id, !pollItem.disabled,  (err) => {
      if(err) {
        Notificator.error(err.reason);
      }
    }); 
  },

  toggleShowResults({ Meteor, LocalState, Notificator }, pollItem) {
    Meteor.call('pollItems.toggleShowResults', pollItem._id, !pollItem.showResult,  (err) => {
      if(err) {
        Notificator.error(err.reason)
      }
    }); 
  },

  handleChartTypeChange({ Meteor, LocalState }, chartType, pollItemId) {
    Meteor.call('pollItems.updateChartType', pollItemId, chartType,  (err) => {
      if(err) {
        Notificator.error(err.reason);
      }
    });
  }
}