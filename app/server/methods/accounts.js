import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default () => {
	Meteor.methods({
		'users.setEmail'(oldEmail, newEmail) {
			const userId = this.userId;
			check(oldEmail, String);
			check(newEmail, String);

			Accounts.addEmail(userId, newEmail);
			Accounts.removeEmail(userId, oldEmail);
		},

		'users.setUsername'(newName) {
			const userId = this.userId;
			check(newName, String);

			Accounts.setUsername(userId, newName);
		}
	});
}