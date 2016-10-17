import { Meteor } from 'meteor/meteor';
import Polls from '../../lib/collections/polls.jsx';
import PollItems from '../../lib/collections/poll_items.jsx';
import PollItemOptions from '../../lib/collections/poll_item_options.jsx';

export default () => {
  Meteor.startup(function () {
    Polls.remove({ _id: 'demoPoll' });
    PollItems.remove({ pollId: 'demoPoll' });
    PollItemOptions.remove({ pollId: 'demoPoll' });

    if (!Polls.findOne('demoPoll')) {
      Polls.insert({
        _id: 'demoPoll',
        userId: 'demoUser',
        name: 'Demo',
        votesTotal: 0,
        isPrivate: false,
        createdAt: new Date
      });

      PollItems.insert({
        _id: 'demoPollItem',
        pollId: 'demoPoll',
        active: true,
        disabled: false,
        showResults: true,
        text: "Are You an Early Bird or a Night Owl?",
        description: '![Early Bird Vs. Night Owl](https://cloud.githubusercontent.com/assets/2095940/13651470/23d74ef2-e650-11e5-95ea-13c9324bac5d.jpg)',
        userId: 'demoUser',
        chartType: 'pie'
      });

      PollItemOptions.insert({
        _id: "demoPollItemOption1",
        pollId: "demoPoll",
        pollItemId: "demoPollItem",
        rank: 1,
        text: "Early Bird",
        votes: 15,
        userId: 'demoUser'
      });

      PollItemOptions.insert({
        _id: "demoPollItemOption2",
        pollId: "demoPoll",
        pollItemId: "demoPollItem",
        rank: 2,
        text: "Night Owl",
        votes: 21,
        userId: 'demoUser'
      });
    }
  });
}
