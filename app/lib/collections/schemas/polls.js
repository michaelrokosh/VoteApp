import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const PollSchema = new SimpleSchema({
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

export default PollSchema;