import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const PollItemOptionSchema = new SimpleSchema({
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

export default PollItemOptionSchema;