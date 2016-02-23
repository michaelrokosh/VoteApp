Meteor.startup(function () {
  Polls.remove({ _id: 'demoPoll' });
  PollItems.remove({ pollId: 'demoPoll' });
  PollItemOptions.remove({ pollId: 'demoPoll' });

  if (!Polls.findOne({ _id: 'demoPoll' })) {
    Polls.insert({
      _id: 'demoPoll',
      userId: 'demoUser',
      name: 'Demo',
      createdAt: new Date
    });

    PollItems.insert({
      _id: 'demoPollItem',
      pollId: 'demoPoll',
      active: true,
      disabled: false,
      showResults: true,
      text: "Are You an Early Bird or a Night Owl?",
      userId: 'demoUser'
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
