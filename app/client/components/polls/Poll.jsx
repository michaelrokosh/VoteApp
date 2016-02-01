C.Poll = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      poll: Polls.findOne({ _id: FlowRouter.getParam('_id') }),
      isReady: FlowRouter.subsReady()
    }
  },

  render() {
    const { currentUser, poll, isReady } = this.data;

    if (!isReady) {
      return <C.MainLoader />
    }
    if (!currentUser) {
      return <C.UserSignUp />
    }
    if (currentUser._id !== poll.userId) {
      return <C.PollView />
    } else {
      return <C.EditablePoll />
    }
  }
});
