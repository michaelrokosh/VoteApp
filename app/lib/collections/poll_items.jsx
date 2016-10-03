const PollItems = new Mongo.Collection('pollItems');

// PollItems.allow({
//   insert: function (userId, doc) {
//     if (!userId) return false;
//     if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
//     return true;
//   },

//   update: function (userId, doc) {
//     if (!userId) return false;
//     if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
//     return true;
//   },
  
//   remove: function (userId, doc) {
//     if (!userId) return false;
//     if (Polls.findOne({ _id: doc.pollId }).userId !== userId) return false;
//     return true;
//   }
// });

Schemas.PollItem = new SimpleSchema({
  userId: {
    type: String,
    denyUpdate: true
  },
  active: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  showResults: {
    type: Boolean
  },
  pollId: {
    type: String,
    denyUpdate: true
  },
  text: {
    type: String,
    trim: false
  },
  description: {
    type: String,
    trim: false,
    optional: true
  },
  chartType: {
    type: String
  }
});

PollItems.attachSchema(Schemas.PollItem);




export default PollItems;
