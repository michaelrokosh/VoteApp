export default {
	updateText({ Meteor }, e, pollItemId) {
	  const updatedText = e.target.value;

	  Meteor.call('pollItemOptions.updateText', pollItemId, updatedText);
  },

 	handleKeyUp({}, e, pollItemId) {
  	if (e.which === 13) {
    		this.updateText(e, pollItemId);
  	} 
  },
  	
  removePollItemOption({ Meteor }, pollItemId) {
  	Meteor.call('pollItemOptions.removeById', pollItemId);
  },

  voteAction({ Meteor }, pollItemOptionId) {
    Meteor.call('votes.vote', pollItemOptionId);
  }
}