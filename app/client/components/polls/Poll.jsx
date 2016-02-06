C.Poll = React.createClass({
  PropTypes: {
    preview: React.PropTypes.boolean
  },

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
    if (this.props.preview) {
      return <C.PollView preview={ true }/> 
    }
    if (!currentUser) {
      return <C.UserSignInOrSignUp />
    }
    if (currentUser._id !== poll.userId) {
      return <C.PollView />
    } else {
      return <C.EditablePoll />
    }
  }
});
