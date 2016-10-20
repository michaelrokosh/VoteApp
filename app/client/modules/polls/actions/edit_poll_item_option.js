export default {
	updateText({ Meteor, Notificator }, updatedText, pollItemId) {
	  Meteor.call('pollItemOptions.updateText', pollItemId, updatedText, (err) => {
      if(err) {
        Notificator.error(err.reason);
      }
    });
  },
  	
  removePollItemOption({ Meteor, Notificator }, pollItemId) {
  	Meteor.call('pollItemOptions.removeById', pollItemId, (err) => {
      if(err) {
        Notificator.error(err.reason);
      }
    });
  },

  voteAction({ Meteor, Notificator }, pollItemOptionId) {
    Meteor.call('votes.vote', pollItemOptionId, (err) => {
      if(err) {
        Notificator.error(err.reason);
      }
    });
  }
}