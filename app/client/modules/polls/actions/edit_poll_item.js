export default {
	updateText({ Meteor, APP_ERRORS }, updatedText, pollItemId) { 
   	Meteor.call('pollItems.updateText', pollItemId, updatedText, (err) => {
      if(err) {
        APP_ERRORS.set('EditPollItem', err.reason);
      }
    });
  },

 	updateDescription({ Meteor },  updatedDescription, pollItemId) {
    Meteor.call('pollItems.updateDescription', pollItemId, updatedDescription,  (err) => {
      if(err) {
        APP_ERRORS.set('EditPollItem', err.reason);
      }
    })
  },

	removePollItem({ Meteor }, pollItemId) {
  	Meteor.call('pollItems.removeById', pollItemId,  (err) => {
      if(err) {
        APP_ERRORS.set('EditPollItem', err.reason);
      }
    });
	},

	addPollItemOption({ Meteor }, pollItemId) {
  	Meteor.call('pollItemOptions.insert', pollItemId,  (err) => {
      if(err) {
        APP_ERRORS.set('EditPollItem', err.reason);
      }
    });
	},

	toggleActive({ Meteor }, pollItem) {
  	Meteor.call('pollItems.toggleActive', pollItem._id, !pollItem.active,  (err) => {
      if(err) {
        APP_ERRORS.set('EditPollItem', err.reason);
      }
    }); 
	},

  toggleDisabled({ Meteor }, pollItem) {
  	Meteor.call('pollItems.toggleDisabled', pollItem._id, !pollItem.disabled,  (err) => {
      if(err) {
        APP_ERRORS.set('EditPollItem', err.reason);
      }
    }); 
  },

  toggleShowResults({ Meteor }, pollItem) {
     Meteor.call('pollItems.toggleShowResults', pollItem._id, !pollItem.showResult,  (err) => {
      if(err) {
        APP_ERRORS.set('EditPollItem', err.reason);
      }
    }); 
  },

  handleChartTypeChange({ Meteor }, chartType, pollItemId) {
    Meteor.call('pollItems.updateChartType', pollItemId, chartType,  (err) => {
      if(err) {
        APP_ERRORS.set('EditPollItem', err.reason);
      }
    });
  }
}