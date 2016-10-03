const PollItemOptions = new Mongo.Collection('pollItemOptions');

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


export default PollItemOptions;