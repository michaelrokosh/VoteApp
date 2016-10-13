import { Mongo } from 'meteor/mongo';

import PollSchema from './schemas/polls.js';

const Polls = new Mongo.Collection('polls');

export const pollsAllows = () => {
  Polls.allow({ 
    insert: function (userId, doc) {
      return !!userId;
    }
  });
}

Polls.attachSchema(PollSchema);

export default Polls;