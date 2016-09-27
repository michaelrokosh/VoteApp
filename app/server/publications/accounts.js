import { Meteor } from 'meteor/meteor';

export default () => {
  Meteor.publish('currentUser', function () {
    return Meteor.users.find({ _id: this.userId });
  });

  Meteor.publish('userByUsername', function (username) {
    check(username, String);

    return Meteor.users.find({ username: username });
  });
}