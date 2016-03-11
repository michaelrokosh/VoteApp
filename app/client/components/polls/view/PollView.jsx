C.PollView = React.createClass({
  PropTypes: {
    preview: React.PropTypes.boolean,
    pollId: React.PropTypes.string
  },

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      poll: Polls.findOne({ _id: this.props.pollId }),
      activePollItems: PollItems.find({ 
        pollId: this.props.pollId,
        active: true
      }).fetch()
    }
  },

  getInitialState() {
    return {
    }
  },

  render() {
    const { currentUser, poll, activePollItems } = this.data;
    let infoContainer;
    if (activePollItems.length === 0) {
      infoContainer = (
        <p>No active items...</p>
      )
    }
    return (
      <div className="poll-view">
        <h1 className="text-center">{ poll.name }</h1>
        { infoContainer }
        {
          activePollItems.map((pollItem, i) => {
            return (
              <div key={ i }>
                <C.PollItemView pollItem={ pollItem } preview={ !!this.props.preview }/>
              </div>
            )
          })
        }
      </div>
    );
  }
});
