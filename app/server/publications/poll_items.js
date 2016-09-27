import { Meteor } from 'meteor/meteor';
import PollItems from '../../lib/collections/poll_items.jsx';


export default () => {
  Meteor.publish('pollItems', function (pollId) {
    return PollItems.find({ pollId: pollId });
  });

  Meteor.publish('pollItem', function (pollItemId) {
    return PollItems.find({ _id: pollItemId });
  });
}