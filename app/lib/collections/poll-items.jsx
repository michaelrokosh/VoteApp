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

Schemas.PollItem = new SimpleSchema({
  userId: {
    type: String,
    denyUpdate: true
  },
  active: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  showResults: {
    type: Boolean
  },
  pollId: {
    type: String,
    denyUpdate: true
  },
  text: {
    type: String,
    trim: false
  }
});

PollItems.attachSchema(Schemas.PollItem);

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
    },

    'pollItems/toggleDisabled': (pollItemId, setDisabled) => {
      const pollItem = PollItems.findOne({ _id: pollItemId });
      const poll = Polls.findOne({ _id: pollItem.pollId });

      if (Meteor.userId() === poll.userId) {
        PollItems.update({ _id: pollItemId }, { $set: { disabled: setDisabled }});
      } else {
        throw new Meteor.Error('not-authorized');
      }
    },

    'pollItems/toggleShowResults': (pollItemId, setShowResults) => {
      const pollItem = PollItems.findOne({ _id: pollItemId });
      const poll = Polls.findOne({ _id: pollItem.pollId });

      if (Meteor.userId() === poll.userId) {
        PollItems.update({ _id: pollItemId }, { $set: { showResults: setShowResults }});
      } else {
        throw new Meteor.Error('not-authorized');
      }
    },

    'pollItems/remove': function (pollItemId) {
      const pollItem = PollItems.findOne({ _id: pollItemId });
      const poll = Polls.findOne({ _id: pollItem.pollId });

      if (Meteor.userId() === poll.userId) {
        PollItemOptions.remove({pollItemId: pollItemId}, function (err) {
          if (!err) {
            Votes.remove({ pollItemId: pollItemId });
            PollItems.remove({ _id: pollItemId });
          }
        });
      } else {
        throw new Meteor.Error('not-authorized');
      }
    }
  });
}