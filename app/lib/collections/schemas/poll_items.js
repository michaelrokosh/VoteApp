import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const PollItemSchema = new SimpleSchema({
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
  },
  description: {
    type: String,
    trim: false,
    optional: true
  },
  chartType: {
    type: String
  }
});

export default PollItemSchema;