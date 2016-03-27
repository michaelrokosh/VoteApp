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
    let chartComponent;

    if (!isReady) {
      Session.set('isLoading', true);
      return <C.MainLoader />
    }

    Session.set('isLoading', false);

    if (pollItem.chartType === 'bars') {
      chartComponent = <C.BarsChart pollItemId={ pollItem._id } params={ params }/>;
    } else {
      chartComponent = <C.PieChart pollItemId={ pollItem._id } params={ params }/>;
    }

    if (pollItem.showResults) {
      return chartComponent;
    } else {
      return (
        <small>Results are hidden</small>
      )
    }

    if (currentUser && currentUser._id === pollItem.userId || pollItem.showResults) {
      return chartComponent;
    } else {
      return (
        <h3>Results are hidden</h3>
      )
    }
  }
});
