import { Mongo } from 'meteor/mongo';

import PollItemOptionSchema from './schemas/poll_item_options.js';

const PollItemOptions = new Mongo.Collection('pollItemOptions');
PollItemOptions.attachSchema(PollItemOptionSchema);

export default PollItemOptions;