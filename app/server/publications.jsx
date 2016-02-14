Meteor.publish('poll', function (pollId) {
  return Polls.find({ _id: pollId });
});

Meteor.publish('polls', function () {
  return Polls.find();
});

Meteor.publish('pollItems', function (pollId) {
  return PollItems.find({ pollId: pollId });
});

Meteor.publish('pollItem', function (pollItemId) {
  return PollItems.find({ _id: pollItemId });
});

Meteor.publish('pollItemOptionsByPollId', function (pollId) {
  return PollItemOptions.find({ pollId: pollId });
});

Meteor.publish('pollItemOption', function (pollItemOptionId) {
  return PollItemOptions.find({ _id: pollItemOptionId });
});

Meteor.publish('pollItemOptionsByPollItemId', function (pollItemId) {
  return PollItemOptions.find({ pollItemId: pollItemId });
});

Meteor.publish('vote', function (pollItemOptionId) {
  return Votes.find({ 
    pollItemOptionId: pollItemOptionId,
    userId: this.userId
  });
});
