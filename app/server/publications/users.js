import { Meteor } from 'meteor/meteor';


export default () => {
	Meteor.publish('users.userByUsername', (username) => {
		check(username, String);
		return Meteor.users.find({username: username});
	})
}