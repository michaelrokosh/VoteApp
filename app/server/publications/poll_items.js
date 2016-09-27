import { Meteor } from 'meteor/meteor';

export default () => {
  Meteor.publish('pollItems', function (pollId) {
    return PollItems.find({ pollId: pollId });
  });

  Meteor.publish('pollItem', function (pollItemId) {
    return PollItems.find({ _id: pollItemId });
  });
}