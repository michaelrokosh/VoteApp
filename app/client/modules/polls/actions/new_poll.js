export default {
	createPoll({ Collections, FlowRouter, LocalState, Meteor, Notificator }, pollName, isPrivate) {
    if(!pollName) {
      Notificator.error('Poll name is reqired!');
      return;
    }

    Collections.Polls.insert({ 
      name: pollName,
      userId: Meteor.userId(),
      votesTotal: 0,
      isPrivate: true,
      createdAt: new Date
    }, (err, _id) => {
        if (err) {
          Notificator.error(err.reason);
          return;
        } else {
            FlowRouter.go('EditPoll', { _id: _id});
        }
    });
	}
}