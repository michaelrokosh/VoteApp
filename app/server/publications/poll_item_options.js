import { Meteor } from 'meteor/meteor';
import PollItemOptions from '../../lib/collections/poll_item_options.jsx';


export default () => {
  Meteor.publish('pollItemOptions.pollItemOptionsByPollId', function (pollId) {
    return PollItemOptions.find({ pollId: pollId });
  });

  Meteor.publish('pollItemOptions.pollItemOption', function (pollItemOptionId) {
    return PollItemOptions.find({ _id: pollItemOptionId });
  });

  Meteor.publish('pollItemOptions.pollItemOptionsByPollItemId', function (pollItemId) {
    return PollItemOptions.find({ pollItemId: pollItemId });
  });
}