PollItemOptions = new Mongo.Collection('poll-item-options');

if (Meteor.isClient) DemoPollItemOptions = new Mongo.Collection(null);

Schemas.PollItemOption = new SimpleSchema({
  pollId: {
    type: String,
    denyUpdate: true
  },
  pollItemId: {
    type: String,
    denyUpdate: true
  },
  text: {
    type: String,
    trim: false,
    optional: true
  },
  rank: {
    type: Number,
    min: 0
  },
  userId: {
    type: String,
    denyUpdate: true
  },
  votes: {
    type: Number,
    min: 0
  }
});

PollItemOptions.attachSchema(Schemas.PollItemOption);

Meteor.methods({
  'PollItemOptions/insert': (pollItemId, text) => {
    check(pollItemId, Match.Optional(String));
    check(text, Match.Optional(String));
    const pollItem = PollItems.findOne({ _id: pollItemId });
    const poll = Polls.findOne({ _id: pollItem.pollId });
    const userId = Meteor.userId();
    check(pollItem, Object);
    check(poll, Object);
    check(userId, String);

    if (!userId || userId !== poll.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const lastPollItemOption = PollItemOptions.findOne({ pollItemId: pollItemId }, { sort: { rank: -1 } });
    const lastRank = lastPollItemOption ? lastPollItemOption.rank : 0;
    PollItemOptions.insert({
      userId: userId,
      pollId: poll._id,
      text: text || '',
      pollItemId: pollItemId,
      rank: lastRank + 1,
      votes: 0
    });
  },

  'PollItemOptions/removeById': (pollItemOptionId) => {
    check(pollItemOptionId, String);

    const option = PollItemOptions.findOne({ _id: pollItemOptionId });

    if (!option) {
      throw new Meteor.Error('not-found');
    }

    if (Meteor.userId() && Meteor.userId() === option.userId) {
      PollItemOptions.remove({ _id: pollItemOptionId });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },

  'PollItemOptions/updateText': (pollItemOptionId, updatedText) => {
    check(pollItemOptionId, String);
    check(updatedText, String);

    const option = PollItemOptions.findOne({ _id: pollItemOptionId });

    if (!option) {
      throw new Meteor.Error('not-found');
    }

    if (Meteor.userId() && Meteor.userId() === option.userId) {
      PollItemOptions.update({ _id: pollItemOptionId }, { $set: { text: updatedText } }, { autoConvert: false });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  }
});