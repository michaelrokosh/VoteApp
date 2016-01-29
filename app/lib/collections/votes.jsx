Votes = new Mongo.Collection('votes');

if (Meteor.isServer) {
  let initializing = true;
  Votes.find().observe({
    added: function (doc) {
      if (!initializing) PollItemOptions.update({ _id: doc.pollItemOptionId }, { $inc: { votes: 1 }});
    },

    removed: function (oldDoc) {
      if (!initializing) PollItemOptions.update({ _id: oldDoc.pollItemOptionId }, { $inc: { votes: -1 }});
    }
  });
  initializing = false;

  Meteor.methods({
    vote: (pollItemOptionId) => {
      const pollItemOption = PollItemOptions.findOne({ _id: pollItemOptionId});
      const poll = Polls.findOne({ _id: pollItemOption.pollId });
      const pollItem = PollItems.findOne({ _id: pollItemOption.pollItemId });
      const userId = Meteor.userId();
      Votes.remove({ 
        userId: userId,
        pollItemId: pollItem._id
      }, function () {
        Votes.insert({
          userId: userId,
          pollId: poll._id,
          pollItemId: pollItem._id,
          pollItemOptionId: pollItemOptionId
        });
      });
    }
  });
}
