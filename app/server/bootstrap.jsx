Meteor.startup(() => {

  Migrations.migrateTo('latest');
  
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      email: "qwe@qwe.qwe",
      password: "qweqweqwe"
    });
  }

  Meteor.setInterval(() => {
    const pollItemId = 'demoPollItem';
    const pollItem = PollItems.findOne(pollItemId);
    const optionId = 'demoPollItemOption' + Random.choice([1, 2]);
    const option = PollItemOptions.findOne(optionId);
    const inc = option.votes < 1 ? 1 : Random.choice([1, -1]);

    if (pollItem.active && !pollItem.disabled) {
      PollItemOptions.update({ _id: optionId }, { $inc: { 'votes': inc } });
    }
  }, 1500);

  Meteor.setInterval(() => {
    const pollItemId = 'demoPollItem';
    const pollItem = PollItems.findOne(pollItemId);

    PollItems.update({ _id: pollItemId }, { $set: { active: false } });

    Meteor.setTimeout(() => {
      PollItems.update({ _id: pollItemId }, { $set: { active: true } });
    }, 2000);
  }, 20000);

  Meteor.setInterval(() => {
    const pollItemId = 'demoPollItem';
    const pollItem = PollItems.findOne(pollItemId);

    if (pollItem.chartType === 'pie') {
      PollItems.update({ _id: pollItemId }, { $set: { chartType: 'bars' } });
    } else {
      PollItems.update({ _id: pollItemId }, { $set: { chartType: 'pie' } });
    }
  }, 5000);

  Meteor.setInterval(() => {
    const pollItemId = 'demoPollItem';
    const pollItem = PollItems.findOne(pollItemId);

    PollItems.update({ _id: pollItemId }, { $set: { disabled: true } });

    Meteor.setTimeout(() => {
      PollItems.update({ _id: pollItemId }, { $set: { disabled: false } });
    }, 3000);
  }, 11000);
});