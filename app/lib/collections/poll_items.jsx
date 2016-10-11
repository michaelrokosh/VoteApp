import { Mongo } from 'meteor/mongo';

import PollItemSchema from './schemas/poll_items.js';

const PollItems = new Mongo.Collection('pollItems');
PollItems.attachSchema(PollItemSchema);

export default PollItems;
