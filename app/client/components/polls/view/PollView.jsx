C.PollView = React.createClass({
  PropTypes: {
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
      data.activePollItems = PollItems.find({ 
        pollId: this.props.pollId,
        active: true
      }).fetch(),
      // data.pollItemOptions = PollItemOptions.find({ pollId: this.props.pollId }).fetch();
      data.isReady = true;
      data.currentUser = Meteor.user();
    }

    return data;
  },

  render() {
    const { currentUser, poll, activePollItems, isReady } = this.data;
    let infoContainer;

    if (!isReady) {
      Session.set('isLoading', true);
      return <C.MainLoader />
    }

    Session.set('isLoading', false);

    if (activePollItems.length === 0) {
      infoContainer = (
        <p>No active items...</p>
      )
    }
    return (
      <div className="poll-view">
        <h2 className="text-center">{ poll.name }</h2>
        { infoContainer }
        {
          activePollItems.map((pollItem, i) => {
            return (
              <div key={ i }>
                <C.PollItemView pollItem={ pollItem } />
              </div>
            )
          })
        }
      </div>
    );
  }
});
