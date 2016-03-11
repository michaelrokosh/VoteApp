C.PollItemChartWrapper = React.createClass({
  PropTypes: {
    pollItemId: React.PropTypes.string.required
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const { pollItemId } = this.props;
    return {
      pollItem: PollItems.findOne({ _id: pollItemId }),
      pollItemOptions: PollItemOptions.find({ pollItemId: pollItemId }).fetch(),
      currentUser: Meteor.user(),
      isReady: FlowRouter.subsReady()
    }
  },

  render() {
    const { pollItem, pollItemOptions, currentUser, isReady } = this.data;

    if (!isReady) {
      return <C.MainLoader />
    }

    if (currentUser && currentUser._id === pollItem.userId) {
      return <C.PollItemChart pollItemId={ pollItem._id }/>;
    } else if (pollItem.showResults) {
      return <C.PollItemChart pollItemId={ pollItem._id }/>;
    } else {
      return (
        <h3>Results are hidden</h3>
      )
    }

    if (pollItem.showResults) {
      return <C.PollItemChart pollItemId={ pollItem._id }/>;
    } else {
      return (
        <small>Results are hidden</small>
      )
    }
  }
});
