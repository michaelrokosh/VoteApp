PollItems = new Mongo.Collection('poll-items');

// PollItems.allow({
//   insert: function (userId, doc) {
//     if (!userId) return false;
//     if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
//     return true;
//   },

//   update: function (userId, doc) {
//     if (!userId) return false;
//     if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
//     return true;
//   },
  
//   remove: function (userId, doc) {
//     if (!userId) return false;
//     if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
//     return true;
//   }
// });

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

Meteor.methods({
  'PollItems/insert': (pollId, text, options) => {
    check(pollId, String);
    check(text, String);
    check(options, Match.Optional([{
      text: String
    }]));

    const userId = Meteor.userId();

    PollItems.insert({
      text: text,
      userId: userId,
      pollId: pollId,
      active: false,
      showResults: false,
      disabled: true
    }, (err, pollItemId) => {
      if (!err && options) {
        for (let i = 0; i < options.length; i++) {
          PollItemOptions.insert({
            userId: userId,
            pollItemId: pollItemId,
            pollId: pollId,
            text: options[i].text,
            rank: i + 1,
            votes: 0
          });
        }
      }
    });
  },

  'PollItems/updateText': (pollItemId, updatedText) => {
    check(pollItemId, String);
    check(updatedText, String);

    const pollItem = PollItems.findOne({ _id: pollItemId });

    if (!pollItem) {
      throw new Meteor.Error('not-found');
    }

    if (!Meteor.userId() === pollItem.userId) {
      throw new Meteor.Error('not-authorized');
    }

    PollItems.update({ _id: pollItemId }, { $set: { text: updatedText } }, { autoConvert: false });
  },

  'PollItems/toggleActive': (pollItemId, setActive) => {
    const pollItem = PollItems.findOne({ _id: pollItemId });
    const poll = Polls.findOne({ _id: pollItem.pollId });

    if (Meteor.userId() === poll.userId) {
      PollItems.update({ _id: pollItemId }, { $set: { active: setActive }});
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },

  'PollItems/toggleDisabled': (pollItemId, setDisabled) => {
    const pollItem = PollItems.findOne({ _id: pollItemId });
    const poll = Polls.findOne({ _id: pollItem.pollId });

    if (Meteor.userId() === poll.userId) {
      PollItems.update({ _id: pollItemId }, { $set: { disabled: setDisabled }});
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },

  'PollItems/toggleShowResults': (pollItemId, setShowResults) => {
    const pollItem = PollItems.findOne({ _id: pollItemId });
    const poll = Polls.findOne({ _id: pollItem.pollId });

    if (Meteor.userId() === poll.userId) {
      PollItems.update({ _id: pollItemId }, { $set: { showResults: setShowResults }});
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },

  'PollItems/removeById': (pollItemId) => {
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
