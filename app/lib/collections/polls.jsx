Polls = new Mongo.Collection('polls');

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
  createdAt: {
    type: Date,
    min: 0,
    denyUpdate: true
  }
});

Polls.attachSchema(Schemas.Poll);