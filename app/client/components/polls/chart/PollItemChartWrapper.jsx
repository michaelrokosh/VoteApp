C.PollItemChartWrapper = React.createClass({
  PropTypes: {
    pollItemId: React.PropTypes.string.required,
    params: React.PropTypes.object
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
    const { params } = this.props;

    if (!isReady) {
      return <C.MainLoader />
    }

    if (pollItem.showResults) {
      return <C.PollItemChart pollItemId={ pollItem._id }/>;
    } else {
      return (
        <small>Results are hidden</small>
      )
    }

    if (currentUser && currentUser._id === pollItem.userId || pollItem.showResults) {
      return <C.PollItemChart pollItemId={ pollItem._id } params= { params }/>;
    } else {
      return (
        <h3>Results are hidden</h3>
      )
    }
  }
});
