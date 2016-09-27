const Polls = new Mongo.Collection('polls');

Polls.allow({ 
  insert: function (userId, doc) {
    if (!userId) return false;
    return true;
  }
});

Schemas.Poll = new SimpleSchema({
  userId: {
    type: String,
    denyUpdate: true
  },
  name: {
    type: String
  },
  votesTotal: {
    type: Number,
    min: 0
  },
  isPrivate: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    min: 0,
    denyUpdate: true
  }
});

Polls.attachSchema(Schemas.Poll);

Meteor.methods({
  'Polls/togglePrivate': (pollId) => {
    check(pollId, String);

    const poll = Polls.findOne({ _id: pollId });

    if (!poll) {
      throw new Meteor.Error('not-found');
    }

    if (Meteor.userId() !== poll.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Polls.update({ _id: pollId }, { $set: { isPrivate: !poll.isPrivate } });
  }
});

export default Polls;