import { Mongo } from 'meteor/mongo';

import AvatarsSchema from './schemas/avatars.js';

const Avatars = new Mongo.Collection('avatars');
Avatars.attachSchema(AvatarsSchema);

export default Avatars;