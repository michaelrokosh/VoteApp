import { Meteor } from 'meteor/meteor';
import Avatars from '../../lib/collections/avatars.jsx';

export default () => {
	Meteor.methods({
		'avatars.setAvatar'(imageURL) {
			const userId = this.userId;
		
			check(imageURL, String);
			check(userId, String);

			Avatars.upsert({userId: userId}, {
				$set: {
					userId: userId,
					imageURL: imageURL
				}
			});
		}
	})
}