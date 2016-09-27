Meteor.publish('currentUser', function () {
  return Meteor.users.find({ _id: this.userId });
});

Meteor.publish('userByUsername', function (username) {
  check(username, String);

  return Meteor.users.find({ username: username });
});

Meteor.publish('poll', function (pollId) {
  return Polls.find({ _id: pollId });
});

Meteor.publish('polls', function () {
  return Polls.find({ isPrivate: false });
});

Meteor.publish('userPollsByUsername', function (username) {
  const user = Meteor.users.findOne({ username: username });
  check(user, Object);
  check(user._id, String);
  let selector = { userId: user._id };
  if (this.userId !== user._id) {
    selector.isPrivate = false;
  } 

  return Polls.find(selector);
});

Meteor.publish('pollItems', function (pollId) {
  return PollItems.find({ pollId: pollId });
});

Meteor.publish('pollItem', function (pollItemId) {
  return PollItems.find({ _id: pollItemId });
});

Meteor.publish('pollItemOptionsByPollId', function (pollId) {
  return PollItemOptions.find({ pollId: pollId });
});

Meteor.publish('pollItemOption', function (pollItemOptionId) {
  return PollItemOptions.find({ _id: pollItemOptionId });
});

Meteor.publish('pollItemOptionsByPollItemId', function (pollItemId) {
  return PollItemOptions.find({ pollItemId: pollItemId });
});

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