C.Poll = React.createClass({
  PropTypes: {
    preview: React.PropTypes.boolean,
    pollId: React.PropTypes.string
  },

  mixins: [ReactMeteorData],
  getMeteorData() {
    const pollHandle = Meteor.subscribe('poll', this.props.pollId);
    const pollItemsHandle = Meteor.subscribe('pollItems', this.props.pollId);
    const pollItemOptionsHandle = Meteor.subscribe('pollItemOptionsByPollId', this.props.pollId);
    let data = {
      isReady: false
    };
    
    if (pollHandle.ready() && pollItemsHandle.ready() && pollItemOptionsHandle.ready()) {
      data.poll = Polls.findOne({ _id: this.props.pollId });
      data.pollItems = PollItems.find({ pollId: this.props.pollId }).fetch();
      data.pollItemOptions = PollItemOptions.find({ pollId: this.props.pollId }).fetch();
      data.isReady = true;
      data.currentUser = Meteor.user();
    }

    // = pollHandle.ready() && pollItemsHandle.ready() && pollItemOptionsHandle.ready();

    return data;
  },

  render() {
    const { currentUser, poll, isReady } = this.data;

    if (!isReady) {
      return <C.MainLoader />
    }
    if (this.props.preview) {
      return (
        <C.PollView pollId={ this.props.pollId } preview={ true }/> 
      )
    }
    if (poll._id === 'demoPoll' || currentUser && currentUser._id === poll.userId) {
      return (
        <C.EditablePoll pollId={ this.props.pollId } />
      )
    } else {
      return (
        <C.PollView pollId={ this.props.pollId } />
      )
    }
  }
});
