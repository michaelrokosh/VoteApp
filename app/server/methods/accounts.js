import { Accounts } from 'meteor/accounts-base';

export default () => {
	Meteor.methods({
		'users.changeEmail'(oldEmail, newEmail) {
			const userId = this.userId;

			check(oldEmail, String);
			check(newEmail, String);
			check(userId, String);

			Accounts.addEmail(userId, newEmail);
			Accounts.removeEmail(userId, oldEmail);
		}
	});
}