Meteor.publish('poll', function (pollId) {
  return Polls.find({ _id: pollId });
});

Meteor.publish('polls', function () {
  return Polls.find();
});

Meteor.publish('pollItems', function (pollId) {
  return PollItems.find({ pollId: pollId });
});

Meteor.publish('pollItemOptions', function (pollId) {
  return PollItemOptions.find({ pollId: pollId });
});

Meteor.publish('vote', function (pollItemOptionId) {
  return Votes.find({ 
    pollItemOptionId: pollItemOptionId,
    userId: Meteor.userId()
  });
});