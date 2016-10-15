import { Meteor } from 'meteor/meteor';
import Avatars from '../../lib/collections/avatars.jsx';

export default () => {
	Meteor.publish({
		'avatars.userAvatar'(userId) {
			return Avatars.find({userId: userId});
		}
	})
}