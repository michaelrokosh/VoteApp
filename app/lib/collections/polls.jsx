Polls = new Mongo.Collection('polls');
Polls.allow({ 
    insert: function (userId, doc) {
        if (!userId) return false;
        return true;
    }
});