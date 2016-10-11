import { Meteor } from 'meteor/meteor';
import Polls from '../../lib/collections/polls.jsx';

export default () => {
  Meteor.publish('polls.poll', function (pollId) {
    return Polls.find({ _id: pollId });
  });

  Meteor.publish('polls.polls', function () {
    return Polls.find({ isPrivate: false });
  });

  Meteor.publish('polls.userPollsByUsername', function (username) {
    const user = Meteor.users.findOne({ username: username });
    check(user, Object);
    check(user._id, String);
    let selector = { userId: user._id };
    if (this.userId !== user._id) {
      selector.isPrivate = false;
    } 

    return Polls.find(selector);
  });
}