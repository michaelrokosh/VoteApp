const Votes = new Mongo.Collection('votes');

Schemas.Vote = new SimpleSchema({
  userId: {
    type: String,
    denyUpdate: true
  },
  pollId: {
    type: String,
    denyUpdate: true
  },
  pollItemId: {
    type: String,
    denyUpdate: true
  },
  pollItemOptionId: {
    type: String,
    denyUpdate: true
  },
  createdAt: {
    type: Date,
    denyUpdate: true
  }
});

Votes.attachSchema(Schemas.Vote);


export default Votes;