import { Mongo } from 'meteor/mongo';

import VoteSchema from './schemas/votes.js';

const Votes = new Mongo.Collection('votes');
Votes.attachSchema(VoteSchema);

export default Votes;