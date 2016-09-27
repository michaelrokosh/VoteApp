import { Meteor } from 'meteor/meteor';
import Votes from '../../lib/collections/votes.jsx';
import PollItems from '../../lib/collections/poll_items.jsx';

export default () => {
  Meteor.publish('vote', function (pollItemOptionId) {
    check(pollItemOptionId, String);

    return Votes.find({ 
      pollItemOptionId: pollItemOptionId,
      userId: this.userId
    });
  });

  Meteor.publish('votesByPollItemId', function (pollItemId) {
    check(pollItemId, String);
    const pollItem = PollItems.findOne({ _id: pollItemId });
    if (this.userId !== pollItem.userId) {
      this.ready();
    }

    const self = this;
    const subHandle = Votes.find({ pollItemId: pollItemId }).observeChanges({
      added: function (id, fields) {
        const voter = Meteor.users.findOne({ _id: fields.userId });
        self.added("votes", id, _.extend(fields, {
          email: voter.emails[0].address
        }));
      },
      changed: function(id, fields) {
        const voter = Meteor.users.findOne({ _id: fields.userId });
        self.changed("votes", id, _.extend(fields, {
          email: voter.emails[0].address
        }));
      },
      removed: function (id) {
        self.removed("votes", id);
      }
    });

    self.ready();

    self.onStop(function () {
      subHandle.stop();
    });

    // const votes = Votes.find({ pollItemId: pollItemId });
    // const self = this;
    // console.log('self', self)
    // votes.forEach((vote) => {
    //   const voter = Meteor.users.findOne({ _id: vote.userId });
    //   // console.log('voter', voter);
    // });

    // this.ready();
    
    // return Votes.find({ pollItemId: pollItemId });
  });
}