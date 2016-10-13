export default {
	createPoll({ Collections, FlowRouter, APP_ERRORS, Meteor }, pollName, isPrivate) {
    const errors = {};

    if (!pollName) {
        errors.pollName = "Poll name required"
    }

    APP_ERRORS.set('CreatePoll', errors);

    if (! _.isEmpty(errors)) {
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
          errors.insertErr = err.reason;
          APP_ERRORS.set('CreatePoll', errors);
          return;
        } else {
            FlowRouter.go('EditPoll', { _id: _id});
        }
    });
	}
}