PollItems = new Mongo.Collection('poll-items');

PollItems.allow({
  insert: function (userId, doc) {
    if (!userId) return false;
    if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
    return true;
  },

  update: function (userId, doc) {
    if (!userId) return false;
    if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
    return true;
  },
  
  remove: function (userId, doc) {
    if (!userId) return false;
    if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
    return true;
  }
});

if (Meteor.isServer) {
  Meteor.methods({
    'pollItems/toggleActive': (pollItemId, setActive) => {
      const pollItem = PollItems.findOne({ _id: pollItemId });
      const poll = Polls.findOne({ _id: pollItem.pollId });

      if (Meteor.userId() === poll.userId) {
        PollItems.update({ _id: pollItemId }, { $set: { active: setActive }});
      } else {
        throw new Meteor.Error('not-authorized');
      }
    }
  });

  Meteor.methods({
    'pollItems/toggleDisabled': (pollItemId, setDisabled) => {
      const pollItem = PollItems.findOne({ _id: pollItemId });
      const poll = Polls.findOne({ _id: pollItem.pollId });

      if (Meteor.userId() === poll.userId) {
        PollItems.update({ _id: pollItemId }, { $set: { disabled: setDisabled }});
      } else {
        throw new Meteor.Error('not-authorized');
      }
    }
  });

  Meteor.methods({
    'pollItems/toggleShowResults': (pollItemId, setShowResults) => {
      const pollItem = PollItems.findOne({ _id: pollItemId });
      const poll = Polls.findOne({ _id: pollItem.pollId });

      if (Meteor.userId() === poll.userId) {
        PollItems.update({ _id: pollItemId }, { $set: { showResults: setShowResults }});
      } else {
        throw new Meteor.Error('not-authorized');
      }
    }
  });
}