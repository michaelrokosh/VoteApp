import { Meteor } from 'meteor/meteor';
import PollItemOptions from '../../lib/collections/poll_item_options.jsx';


export default () => {
  Meteor.publish('pollItemOptionsByPollId', function (pollId) {
    return PollItemOptions.find({ pollId: pollId });
  });

  Meteor.publish('pollItemOption', function (pollItemOptionId) {
    return PollItemOptions.find({ _id: pollItemOptionId });
  });

  Meteor.publish('pollItemOptionsByPollItemId', function (pollItemId) {
    return PollItemOptions.find({ pollItemId: pollItemId });
  });
}