Migrations.add({
  version: 1,
  name: 'Adds votesTotal property to the Poll',
  up() {
    Polls.find({ votesCount: { $exists: false } }).forEach((poll) => {
      let votesTotal = Votes.find({ pollId: poll._id }).count();

      Polls.update({ _id: poll._id }, { $set: { votesTotal: votesTotal } });
    });
  },
  down() {
    Polls.update({ votesCount: { $exists: true } }, { $unset: { votesCount: '' } }, { multi: true });
  }
});