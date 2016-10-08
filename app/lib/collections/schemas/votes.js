import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const VoteSchema = new SimpleSchema({
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

export default VoteSchema;