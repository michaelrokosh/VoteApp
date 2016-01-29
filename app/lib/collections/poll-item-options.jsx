PollItemOptions = new Mongo.Collection('poll-item-options');

PollItemOptions.allow({
  insert: function (userId, doc) {
    if (!userId) return false;
    if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
    if (PollItems.findOne({ _id: doc.pollItemId }).userId !== userId) return false;
    return true;
  }
})