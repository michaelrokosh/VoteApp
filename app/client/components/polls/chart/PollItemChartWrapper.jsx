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
      isReady: !this.props.showToOwnerOnly || FlowRouter.subsReady()
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
        <small>Results are hidden</small>
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
