export default {
	createPoll({Collections, FlowRouter, LocalState, Meteor}, e) {
		e.preventDefault();
    const pollName = e.target.pollname.value;
    const isPrivate = e.target.togglePrivatePoll.checked;

    const errors = {};

    if (!pollName) {
        errors.pollName = "Poll name required"
    }

    LocalState.set('CreatePollErrors', errors);

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
          LocalState.set('CreatePollErrors', errors);
          return;
        } else {
            FlowRouter.go('EditPoll', { _id: _id});
        }
    });
	}
}