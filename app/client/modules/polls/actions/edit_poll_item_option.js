export default {
	updateText({ Meteor }, updatedText, pollItemId) {
	  Meteor.call('pollItemOptions.updateText', pollItemId, updatedText);
  },
  	
  removePollItemOption({ Meteor }, pollItemId) {
  	Meteor.call('pollItemOptions.removeById', pollItemId);
  },

  voteAction({ Meteor }, pollItemOptionId) {
    Meteor.call('votes.vote', pollItemOptionId);
  }
}