Meteor.publish('poll', function (pollId) {
  return Polls.find({ _id: pollId });
});

Meteor.publish('pollItems', function (pollId) {
  return PollItems.find({ pollId: pollId });
});

Meteor.publish('pollItemOptions', function (pollId) {
  return PollItemOptions.find({ pollId: pollId });
});