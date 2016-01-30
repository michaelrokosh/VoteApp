PollItemOptions = new Mongo.Collection('poll-item-options');

PollItemOptions.allow({
  insert: function (userId, doc) {
    if (!userId) return false;
    if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
    if (PollItems.findOne({ _id: doc.pollItemId }).userId !== userId) return false;
    return true;
  },

  update: function (userId, doc) {
    if (!userId) return false;
    if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
    if (PollItems.findOne({ _id: doc.pollItemId }).userId !== userId) return false;
    return true;
  }
});

Meteor.methods({
  insertPollItemOption: (pollItemId) => {
    const pollItem = PollItems.findOne({ _id: pollItemId });
    const poll = Polls.findOne({ _id: pollItem.pollId });
    const userId = Meteor.userId();
    check(pollItem, Object);
    check(poll, Object);
    check(userId, String);

    if (userId !== poll.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const lastPollItemOption = PollItemOptions.findOne({ pollItemId: pollItemId }, { sort: { rank: -1 } });
    const lastRank = lastPollItemOption ? lastPollItemOption.rank : 0;

    PollItemOptions.insert({
      userId: userId,
      pollId: poll._id,
      text: '',
      pollItemId: pollItemId,
      rank: lastRank + 1,
      votes: 0
    });
  }
});