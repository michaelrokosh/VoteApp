C.Poll = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      poll: Polls.findOne({ _id: FlowRouter.getParam('_id') })
    }
  },

  render() {
    const { currentUser, poll } = this.data;

    if (!poll) {
      return <C.MainLoader />
    }
    if (!currentUser || currentUser._id !== poll.userId) {
      return <C.PollView />
    } else {
      return (
        <C.EditablePoll />
      );
    }
  }
});
